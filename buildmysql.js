const 
  fs 				= require("fs"),
  path 				= require("path"),
  fetch 			= require('node-fetch'),
  tmpl 				= require("./lib/tmpl.js"),
  iconv 			= require('iconv-lite'),
  queue 			= require("./lib/queue.js"), 
  lazylist 			= require("./lib/lazylist.js"),
  buildConfig 		= require("./config/mysqlbuild.js"),
  datasourceConfig  = require("./config/datasource.js")
  inputDir 			= datasourceConfig.NativeDbTableStructDir, 
  sep 				= path.sep,  
  mkdirs 			= require("./lib/mkdirs"),
  clumReg 			= /\s*`([a-z|A-Z|_]*)`\s*([a-z|A-Z]*)[(|)|a-z|\d|,]*\s*([a-z|A-Z]*)\s*([a-z|A-Z]*).*'([\u4e00-\u9fa5]*)'/g,
  dbType 			= {
	"NOTNULLint"		 : "int",
	"DEFAULTNULLint"	 : "Nullable<int>",
	"DEFAULTNULLbigint"	 : "Nullable<int>",
	"DEFAULTNULLvarchar" : "string",
	"NOTNULLvarchar" 	 : "string",
	"DEFAULTNULLtext" 	 : "string",
	"DEFAULTNULLdatetime": "Nullable<DateTime>",
	"DEFAULTNULLdecimal" : "Nullable<decimal>"
};
  
function queryCondition(type,filed,isquery){
	switch(type){
		case "int":
		return isquery?`request.${filed}>0`:`dto.${filed}<=0`; 
		case "Nullable<int>": 
		return isquery?`request.${filed}.GetValueOrDefault()>0`:`dto.${filed}.GetValueOrDefault()<=0`; 
		case "Nullable<DateTime>": 
		return isquery?`request.${filed}.HasValue`:`dto.${filed}==null`;
		case "Nullable<decimal>": 
		return isquery?`request.${filed}.GetValueOrDefault()>0`:`dto.${filed}.GetValueOrDefault()<=0`; 
		default: 
		return isquery?`!string.IsNullOrWhiteSpace(request.${filed})`:`string.IsNullOrWhiteSpace(dto.${filed})`; 
	}
}

function getUnitTestValue(type,filed){
	if(filed==="IsValid"){
		return '"T"';
	}
	switch(type){
		case "int":
		return 6; 
		case "Nullable<int>": 
		return 6; 
		case "Nullable<DateTime>": 
		return "DateTime.Now";
		case "Nullable<decimal>": 
		return 6; 
		default: 
		return '"unittest"'; 
	}

} 
function parseTableData(dir,callback){
	fs.readdir(dir, function(err, _files){
		var tables=[],index=_files.length; 
		if(_files.length==0){
			console.log("未发现表结构数据！");
			return callback(tables); 
		}
		 
		_files.forEach(function(filename){
			var file = dir + sep + filename,entity={};
			var status= fs.statSync(file);
			if(status.isDirectory()){
				console.log(file+" is directory!");
				return callback(tables); 
			}
 
			entity["TableName"]=filename.split(".")[0];
			
			fs.readFile(file,'utf8',function(err, data){
			  	if(err){ 
			  		console.log(err);
			  	} 
				entity["Clumns"]=[];  

			    var table=iconv.decode(new Buffer(data), 'gb2312');//.split("\r\n");
			  	
			  	table.replace(clumReg,function(all,clumnName,clumnType1,clumnType2,clumnType3,clumnDesc){
		  			var type=dbType[clumnType2+clumnType3+clumnType1];
		  			entity["Clumns"].push({
		  				AttributeDesc:clumnDesc,
		  				AttributeType:type,
		  				AttributeName:clumnName,
		  				AttributeCondition:queryCondition(type,clumnName,true)
		  			});
			  	});
			  	tables.push(entity); 
			  	index=index-1;
			  	if(index==0){
			  	return	callback(tables);
			  	}
			});
		});
	});
}

function buildClass(tables,build,callback){

	var entityTmp=fs.readFileSync(build.Template).toString("utf-8");
	tables.forEach(function(table){
		if(build.ModuleId){
			table["ModuleId"]=tmpl.simpTmplParse(build.ModuleId,{TableName:table.TableName.toUpperCase()});
		} 

		if(callback&& typeof callback==="function"){
			callback(table);
		} 
		classInner=tmpl.funcTmplParse(entityTmp,table);
		var targetPath=tmpl.simpTmplParse(build.OutPutFile,table);

		mkdirs(path.dirname(targetPath),function(p){
			fs.writeFile(targetPath,iconv.encode(classInner, 'gbk'),function(err){
				if(err){
					console.log(err)
				}
				console.log("表 "+table.TableName+"--"+build.Desc+" 生成成功！");
			}); 
		})
		
	}) 
}

function getRemoteTableData(callback){
	var pushList=[];
	if(!datasourceConfig.TableNames||!datasourceConfig.TableNames.length){
		return callback([]);  
	}
 
	lazylist(
		datasourceConfig.TableNames.map(function(tableName){
			return function(callback){
				fetch(tmpl.simpTmplParse(datasourceConfig.RemoteUrl,{TableName:tableName}))
				.then(function(response){
					return response.json(); 
				}).then(function(data){
					return callback({TableName:tableName,Clumns:data});
				})
			};
		}),
		function(){ 
			var tables=Array.prototype.map.call(arguments,function(table){
				table.Clumns.forEach(function(clumn){
					var type=dbType[`${(clumn.IsNull=="NO"?"NOT":"DEFAULT")}NULL${clumn.AttributeType}`];
					clumn.AttributeType=type;
					clumn["AddOrUpdateCondition"]=queryCondition(type,clumn.AttributeName,false);
					clumn["AttributeCondition"]=clumn.AttributeName=="CreateUser"?`request.${clumn.AttributeName}>0`:queryCondition(type,clumn.AttributeName,true);
				}) 
				return table;
			})
		return callback(tables);
	})
}
 
 function startBuild(tables){
 	with(buildConfig){ 
		//生成ORM实体类
		BuildEntityClass.Enable&&buildClass(tables,BuildEntityClass);
		//生成数据契约
		BuildDataContract.Enable&&buildClass(tables,BuildDataContract); 
		//生成查询请求响应契约实体
		BuildQueryReqResContract.Enable&&buildClass(tables,BuildQueryReqResContract);
		//生成新增修改请求响应契约实体
		BuildAddOrUpdateReqResContract.Enable&&buildClass(tables,BuildAddOrUpdateReqResContract);
		//生成查询core
		BuildQueryCore.Enable&&buildClass(tables,BuildQueryCore);
		//生成新增修改core
		BuildAddOrUpdateCore.Enable&&buildClass(tables,BuildAddOrUpdateCore);
		//生成数据库实体映射文件
		BuildEntityTypeConfiguration.Enable&&buildClass(tables,BuildEntityTypeConfiguration);
		//生成EF层测试单元
		BuildDataEFUnitTest.Enable&&buildClass(tables,BuildDataEFUnitTest,function(table){
			table.Clumns.forEach(function(clumn){
				clumn["AttributeTest"]=getUnitTestValue(clumn.AttributeType,clumn.AttributeName); 
			}) 	 
		});
		//生成core层测试单元
		BuildCoreUnitTest.Enable&&buildClass(tables,BuildCoreUnitTest,function(table){
			table.Clumns.forEach(function(clumn){
				clumn["AttributeTest"]=getUnitTestValue(clumn.AttributeType,clumn.AttributeName);
			}) 	 
		});

		//生成服务契约及其实现
		BuildService.Enable&&(( tables,build ) => {
			tables.forEach(function(table){
				table["QueryModuleId"]=tmpl.simpTmplParse(build.QueryModuleId,{TableName:table.TableName.toUpperCase()});
				table["AddModuleId"]=tmpl.simpTmplParse(build.AddModuleId,{TableName:table.TableName.toUpperCase()}); 
			})
			var entityTmp=fs.readFileSync(build.Template).toString("utf-8"); 
			fs.writeFile(build.OutPutFile,tmpl.funcTmplParse(entityTmp,tables),function(err){
				if(err){
					console.log(err)
				}
				console.log(build.Desc+" 生成成功！");
			});
		})(tables,BuildService);
	}
 }
function build(){
	lazylist([function(callback){
		if(datasourceConfig.EnableRemoteSource){
			getRemoteTableData(callback);
		}else{
			parseTableData(inputDir,callback);
		} 
	}],function(tables){
		if(!tables||tables.length==0){
			console.log("解析表结构失败！");
			return;
		}
		startBuild(tables); 
	})
	
}

build();