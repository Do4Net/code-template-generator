//生成 mssql C# 代码
const 
  fs              = require("fs"),
  path            = require("path"),
  fetch           = require('node-fetch'),
  tmpl            = require("./lib/tmpl.js"),
  iconv           = require('iconv-lite'),
  queue           = require("./lib/queue.js"), 
  lazylist        = require("./lib/lazylist.js"),
  datasourceConfig= require("./config/datasource.js"),
  buildConfig     = require("./config/mssqlbuild.js"),
  mkdirs          = require("./lib/mkdirs"),
  dbType          = {
  "NOTNULLint"          : "int",
  "DEFAULTNULLint"      : "Nullable<int>",
  "DEFAULTNULLbigint"   : "Nullable<int>",
  "DEFAULTNULLsmallint" : "Nullable<int>",
  "NOTNULLsmallint"     : "int",
  "DEFAULTNULLtinyint"  : "Nullable<int>",
  "NOTNULLtinyint"      : "int",
  "DEFAULTNULLbit"      : "Nullable<bool>",
  "NOTNULLbit"          : "bool",
  "DEFAULTNULLmoney"    : "Nullable<decimal>",
  "NOTNULLmoney"        : "decimal",
  "DEFAULTNULLvarchar"  : "string",
  "NOTNULLvarchar"      : "string",
  "DEFAULTNULLnvarchar" : "string",
  "NOTNULLnvarchar"     : "string",
  "DEFAULTNULLtext"     : "string",
  "DEFAULTNULLdatetime" : "Nullable<DateTime>",
  "NOTNULLdatetime"     : "DateTime",
  "DEFAULTNULLdecimal"  : "Nullable<decimal>"
};

/**
  正则
  // g（全局搜索出现的所有 pattern）
  // i（忽略大小写）
  // m 多行搜索
**/
var reg={
  "Query"             : /select/im,
  "Filed"             : /([a-z|A-Z]*).\[([a-z|A-Z|_]*)\]*/igm,// 别名 字段名称
  "TableName"         : /from\s([a-z|A-Z]*)\sas\s*([a-z|A-Z]*)\s*/igm, //表明 别名
  "JoinTableName"     : /join\s([a-z|A-Z]*)\sas\s*([a-z|A-Z]*)\s*on/igm, //表明 别名
  "BuildSqlType"      : /type:sql/i,
  "BuildSqlTableName" : /name:([a-z]+)/i
}

function queryCondition(type,filed,isquery,alisName){

  alisName=alisName||"extend";
  switch(type){
    case "int": 
      return `<IsNotEqual Prepend = "AND"   CompareValue="0" Property = "${filed}">
        ${alisName}.${filed} = @${filed}
      </IsNotEqual>`; 
    case "Nullable<int>": 
      return `<IsNotEmpty Prepend = "AND" Property = "${filed}">
        ${alisName}.${filed} = @${filed}
      </IsNotEmpty>`; 
    case "Nullable<DateTime>": 
      return `<IsNotEmpty Prepend = "AND" Property = "${filed}">
        ${alisName}.${filed} = @${filed}
      </IsNotEmpty>`;
    case "Nullable<decimal>": 
      return `<IsNotEmpty Prepend = "AND" Property = "${filed}">
        ${alisName}.${filed} = @${filed}
      </IsNotEmpty>`; 
    default: 
      return `<IsNotEmpty Prepend = "AND" Property = "${filed}">
        ${alisName}.${filed} = @${filed}
      </IsNotEmpty>`; 
  }
}

function mergeClumnData(table,args,callback){
  var tableInfo={};
   //二维转换为一维
  Array.prototype.forEach.call(args,function(table){ 
    tableInfo[table.TableName]=table.Clumns;
  });

  table.Clumns.forEach(function(clumn){

   var sourceClumns=tableInfo[table.Tables[clumn.TableAlis]] ;
     if(sourceClumns&&sourceClumns.length>0){
        var sourceClumn=sourceClumns.filter(function(item){
          return item.AttributeName==clumn.AttributeName;
        })[0];
        var type=dbType[`${(sourceClumn.IsNull ?"DEFAULT":"NOT")}NULL${sourceClumn.AttributeType}`];
        clumn["AttributeType"]=type;
        clumn["AttributeDesc"]=sourceClumn.AttributeDesc;
        clumn["AttributeCondition"]=queryCondition(type,sourceClumn.AttributeName,true);
     }
  }); 
  return callback(table); 
}

function fetchData(tableName,dbName,callback){
  fetch(tmpl.simpTmplParse(datasourceConfig.MssqlRemoteUrl,{TableName:tableName,DBName:dbName}))
  .then(function(response){
    return response.json(); 
  }).then(function(data){
    return callback({TableName:tableName,Clumns:data});
  }) 
}

function getRemoteTableData(table,dbName,callback){
  var tableNames=Object.keys(table.Tables).map(function(item){
                  return table.Tables[item];
                });

  if(!tableNames||tableNames.length==0){
    return callback(null);  
  }

  lazylist(
    tableNames.map(function(tableName){
      return function(callback){
        fetchData(tableName,dbName,callback);
      };
    }),
    function(){ 
      mergeClumnData(table,arguments,callback); 
  })
}

function writeFile(table,targetPath,code,desc){

  mkdirs(path.dirname(targetPath),function(p){
    fs.writeFile(targetPath,iconv.encode(code, 'gbk'),function(err){
      if(err){
        console.log(err)
      }
      console.log("表 "+table.TableName+"--"+desc+" 生成成功！");
    }); 
  })
}

function buildClass(table,build,callback){

  var entityTmp=fs.readFileSync(build.Template).toString("utf-8"); 
  var targetPath=tmpl.simpTmplParse(build.OutPutFile,table);

  if(callback){
      return callback(table,targetPath,tmpl.funcTmplParse(entityTmp,table),build.Desc);  
  } 

  writeFile(table,targetPath,tmpl.funcTmplParse(entityTmp,table),build.Desc); 
}

function replaceTplCode(path,code){

  var sourceCode=fs.readFileSync(path).toString("gb2312");
  if(!sourceCode){
    return;
  }
  if(!/\s*\/\/\s*<\s*>\s*/.test(sourceCode)){
    return;
  }
  return sourceCode.replace(/(\s*\/\/\s*<\s*>\s*)/,function(all,a){
    return code;
  });
}

function startBuild(table,callback){
 console.log(`-----------------C# code ${table.TableName} ${/(\d{2}:\d{2}:\d{2})/.exec(new Date())[1]}------------------------`);
  with(buildConfig){ 
    
    BuildContract.Enable&&buildClass(table,BuildContract);
 
    BuildEntityClass.Enable&&buildClass(table,BuildEntityClass);
    
    BuildIBusiness.Enable&&buildClass(table,BuildIBusiness);

    BuildBusiness.Enable&&buildClass(table,BuildBusiness);

    BuildIService.Enable&&buildClass(table,BuildIService);

    BuildService.Enable&&buildClass(table,BuildService); 
  }
 }

function build(table,dbName,callback){
  lazylist([function(callback){
    if(datasourceConfig.EnableRemoteSource){
      getRemoteTableData(table,dbName,callback);
    }else{
      callback([]);
    } 
  }],function(table){
    if(!table){
      console.log("解析表结构失败！");
     return  callback();
    }
    startBuild(table,callback); 
  }) 
} 
 
/*
  解析sql
*/ 
function parseQuerySql(sql){
 
  if(!reg.Query.test(sql)){
      return;
  }
  var table={
    TableName:"",
    Clumns:[],
    Tables:{}
  };
  reg.TableName.lastIndex = 0;
  var sourceTable=reg.TableName.exec(sql);
  if(!sourceTable||sourceTable.length<2){
    return ;
  }

  table.TableName=sourceTable[1];
  table.Tables[(sourceTable[2]||table.TableName)]=table.TableName;

  sql.replace(reg.Filed,function(all,tableAlisa,clumnName){
      table.Clumns.push({AttributeName:clumnName,TableAlis:tableAlisa});
  });

  sql.replace(reg.JoinTableName,function(all,tableName,alisName){ 
    if(!table.Tables[alisName]){
      table.Tables[alisName]=tableName; 
    }
  });

  build(table,buildConfig.DBName,function(){
    //成功
  });
}

/*
  生成sql模板 
  tablename:表名称
*/ 
function buildQuerySql(tableName){
  if(!tableName){
    return;
  }
  fetchData(tableName,buildConfig.DBName,function(table){ 

      table.Clumns.forEach(function(clumn){
         var type=dbType[`${(clumn.IsNull ?"DEFAULT":"NOT")}NULL${clumn.AttributeType}`];
        clumn["AttributeType"]=type;
        clumn["AttributeDesc"]=clumn.AttributeDesc; 
        clumn["AttributeCondition"]=queryCondition(type,clumn.AttributeName,true);
      })   

      buildConfig.BuildSqlTemplate.Enable && buildClass(table,buildConfig.BuildSqlTemplate);
      buildConfig.BuildSqlSelete.Enable && buildClass(table,buildConfig.BuildSqlSelete);
  })
}

function batchBuildCoder(dir){
  dir = dir.replace(/(\/|\\)$/, "");
  fs.readdir(dir, function(err, _files){
    if(err){
      throw err;
    }
    _files.forEach(function(filename){ 
      var status=/(\d+)/.exec(filename);
      if(!status||!!!parseInt(status[1])){
        return;
      }
      fs.readFile(`${dir}${path.sep}${filename}`,function(err,sql){
        if(err){ 
          console.log(err);
        }
        parseQuerySql(sql.toString("utf-8"));
      })
    });
  });
}

/*
  监控文件触发器 初始化
*/
function initWatch(file){

  fs.watch(file,function(){
    fs.readFile(file,'utf8',function(err, sql){
        if(err){ 
          console.log(err);
        }
 
        if(reg.BuildSqlType.test(sql)){ 
          // reg.BuildSqlTableName.lastIndex = 0;
          buildQuerySql(reg.BuildSqlTableName.exec(sql)[1]);
        }else{
          parseQuerySql(sql);
        }
       
      });
  })
}
 
function init(){ 
  if(buildConfig.BatchBuildDoNet){
    batchBuildCoder("./out/Mssql");
  }else{
    initWatch("./dbtablestruct/trigger.txt");
  }  
}

init();
