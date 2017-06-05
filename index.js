const 
  fs=require("fs"),
  path = require("path"),
  fetch = require('node-fetch'),
  tmpl=require("./lib/tmpl.js"),
  queue=require("./lib/queue.js"), 
  lazylist=require("./lib/lazylist.js"),
  buildConfig=require("./config/build.js"),
  datasourceConfig=require("./config/datasource.js")
  inputDir=datasourceConfig.NativeDbTableStructDir, 
  sep = path.sep, 
  clumReg=/\s*`([a-z|A-Z|_]*)`\s*([a-z|A-Z]*)[(|)|a-z|\d|,]*\s*([a-z|A-Z]*)\s*([a-z|A-Z]*).*'([\u4e00-\u9fa5]*)'/g,
  dbType={
	"NOTNULLint"		 : "int",
	"DEFAULTNULLint"	 : "Nullable<int>",
	"DEFAULTNULLbigint"	 : "Nullable<int>",
	"DEFAULTNULLvarchar" : "string",
	"DEFAULTNULLdatetime": "Nullable<DateTime>",
	"DEFAULTNULLdecimal" : "Nullable<decimal>"
};


var queryCondition=function(type,filed){
	switch(type){
		case "int":
		return `request.${filed}>0`; 
		case "Nullable<int>": 
		return `request.${filed}.GetValueOrDefault()>0`; 
		case "Nullable<DateTime>": 
		return `request.${filed}.HasValue`;
		case "Nullable<decimal>": 
		return `request.${filed}.GetValueOrDefault()>0`; 
		default: 
		return `!string.IsNullOrWhiteSpace(request.${filed})`; 
	}
}
 
function parseTableData(dir,callback){
	fs.readdir(dir, function(err, _files){
		var tables=[],index=_files.length; 
		if(_files.length==0){
			console.log("未发现表结构数据！");
			callback(tables);
			return;
		}
		 
		_files.forEach(function(filename){
			var file = dir + sep + filename,entity={};
			var status= fs.statSync(file);
			if(status.isDirectory()){
				console.log(file+" is directory!");
				callback(tables);
				return;
			}
 
			entity["TableName"]=filename.split(".")[0];
			
			fs.readFile(file,'utf8',function(err, data){
			  	if(err){ 
			  		console.log(err);
			  	} 
				entity["Clumns"]=[];  
			    var table=data.toString('utf8').replace("AUTO_INCREMENT","").replace("COMMENT","");//.split("\r\n");
			  	
			  	table.replace(clumReg,function(all,clumnName,clumnType1,clumnType2,clumnType3,clumnDesc){
		  			var type=dbType[clumnType2+clumnType3+clumnType1];
		  			entity["Clumns"].push({
		  				AttributeDesc:clumnDesc,
		  				AttributeType:type,
		  				AttributeName:clumnName,
		  				AttributeCondition:queryCondition(type,clumnName)
		  			});
			  	});
			  	tables.push(entity); 
			  	index=index-1;
			  	if(index==0){
			  		callback(tables);
			  	}
			});
		});
	});
}

function buildClass(tables,build){

	var entityTmp=fs.readFileSync(build.Template).toString("utf-8");
	tables.forEach(function(table){
		if(build.ModuleId){
			table["ModuleId"]=tmpl.simpTmplParse(build.ModuleId,{TableName:table.TableName.toUpperCase()});
		} 
		classInner=tmpl.funcTmplParse(entityTmp,table);
		fs.writeFile(tmpl.simpTmplParse(build.OutPutFile,table),classInner,function(err){
			if(err){
				console.log(err)
			}
			console.log("表 "+table.TableName+"--"+build.Desc+" 生成成功！");
		}); 
	}) 
}

 
function build(){
	lazylist([function(callback){
		if(datasourceConfig.EnableRemoteSource){
			var pushList=[];
			if(datasourceConfig.TableNames&&datasourceConfig.TableNames.length){
				datasourceConfig.TableNames.forEach(function(tableName){
					pushList.push(function(callback){
						fetch(tmpl.simpTmplParse(datasourceConfig.RemoteUrl,{TableName:tableName}))
						.then(function(response){
							return response.json(); 
						}).then(function(data){
							callback({TableName:tableName,Clumns:data});
						})
					}) 
				})

				lazylist(pushList,function(){ 
					var tables=Array.prototype.map.call(arguments,function(table){
						table.Clumns.forEach(function(clumn){
							var type=dbType[`${(clumn.IsNull=="NO"?"NOT":"DEFAULT")}NULL${clumn.AttributeType}`];
							clumn.AttributeType=type;
							clumn["AttributeCondition"]=queryCondition(type,clumn.AttributeName);
						}) 
						return table;
					})
					callback(tables);
				})
			}else{
				callback([]);
			} 
		}else{
			parseTableData(inputDir,function(tables){ 
				callback(tables);
			})
		}
		
	}],function(tables){
		if(!tables||tables.length==0){
			console.log("解析表结构失败！");
			return;
		}
		//console.log(JSON.stringify(tables))
		//生成ORM实体类
		buildConfig.BuildEntityClass.Enable&&buildClass(tables,buildConfig.BuildEntityClass);
		//生成数据契约
		buildConfig.BuildDataContract.Enable&&buildClass(tables,buildConfig.BuildDataContract); 
		//生成查询请求响应契约实体
		buildConfig.BuildQueryReqResContract.Enable&&buildClass(tables,buildConfig.BuildQueryReqResContract);
		//生成新增修改请求响应契约实体
		buildConfig.BuildAddOrUpdateReqResContract.Enable&&buildClass(tables,buildConfig.BuildAddOrUpdateReqResContract);
		//生成查询core
		buildConfig.BuildQueryCore.Enable&&buildClass(tables,buildConfig.BuildQueryCore);
		//生成新增修改core
		buildConfig.BuildAddOrUpdateCore.Enable&&buildClass(tables,buildConfig.BuildAddOrUpdateCore);
	})
	
}

build();