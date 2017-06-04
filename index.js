const tmpl=require("./lib/tmpl.js"),
  fs=require("fs"),
  path = require("path"),
  queue=require("./lib/queue.js"),
  lazylist=require("./lib/lazylist.js"),
  buildConfig=require("./config/build.js"),
  sep = path.sep,
  inputDir="./dbtablestruct", 
  dbType={
	"NOTNULLint":"int",
	"DEFAULTNULLint":"Nullable<int>",
	"DEFAULTNULLbigint":"Nullable<int>",
	"DEFAULTNULLvarchar":"string",
	"DEFAULTNULLdatetime":"Nullable<DateTime>",
	"DEFAULTNULLdecimal":"Nullable<decimal>"
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

var clumReg=/\s*`([a-z|A-Z|_]*)`\s*([a-z|A-Z]*)[(|)|a-z|\d]*\s*([a-z|A-Z]*)\s*([a-z|A-Z]*).*'([\u4e00-\u9fa5]*)'/;

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
			entity["Clumns"]=[];
			
			fs.readFile(file,'utf8',function(err, data){
			  	if(err){ 
			  		console.log(err);
			  	} 

			  	var table=data.toString('utf8').replace("AUTO_INCREMENT","").replace("COMMENT","").split("\r\n");
			  	
			  	table.forEach(function(tr){
			  		tr=tr.replace(" ","");
			  		tr.replace(clumReg,function(all,clumnName,clumnType1,clumnType2,clumnType3,clumnDesc){
			  			var type=dbType[clumnType2+clumnType3+clumnType1];
			  			entity["Clumns"].push({
			  				AttributeDesc:clumnDesc,
			  				AttributeType:type,
			  				AttributeName:clumnName,
			  				AttributeCondition:queryCondition(type,clumnName)
			  			});
			  		})
			  	}) 
			  	
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
		parseTableData(inputDir,function(tables){ 
			callback(tables);
		})
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