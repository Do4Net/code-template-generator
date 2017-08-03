//按照模版自动生成mssql create 表脚本
const 
  fs              = require("fs"),
  path            = require("path"),
  fetch           = require('node-fetch'),
  tmpl            = require("./lib/tmpl.js"),
  iconv           = require('iconv-lite'),
  queue           = require("./lib/queue.js"), 
  lazylist        = require("./lib/lazylist.js"),
  buildConfig     = require("./config/mysqlbuild.js"),
  datasourceConfig= require("./config/datasource.js")
  inputDir        = datasourceConfig.NativeDbTableStructDir, 
  sep             = path.sep,  
  mkdirs          = require("./lib/mkdirs");

function buildClass(table){

  console.log(`-----------------sql : ${table.TableName} ${/(\d{2}:\d{2}:\d{2})/.exec(new Date())[1]}------------------------`);
  var entityTmp=fs.readFileSync("./template/mssql/createsql.txt").toString("utf-8");
  var classInner=tmpl.funcTmplParse(entityTmp,table);
  var targetPath=`./out/CreateSql/${table.TableName}.txt`;

  mkdirs(path.dirname(targetPath),function(p){
    fs.writeFile(targetPath,iconv.encode(classInner, 'gbk'),function(err){
      if(err){
        console.log(err)
      }
      console.log("Create Table Sql : "+table.TableName+" Build Success！");
    }); 
  })
}

function readTemplate(file,callback){
  var entity={};
  fs.readFile(file,'utf8',function(err, table){
      if(err){ 
        console.log(err);
      } 

      entity["Clumns"]=[];   
      entity["TableName"]=/\{([a-z]*)\}./i.exec(table)[1];
      table.replace(/([a-z]*)\s*\[([a-z|A-Z|(|)|\d|_|\s]*)\]\s*([\u4e00-\u9fa5|\s|“|”|\d|:|，|,|：]*)*/igm,function(all,name,condition,desc){
         entity["Clumns"].push({
         AttributeName:name,
         Condition:condition,
         Desc:desc.replace("\r","").replace("\n","").replace(/(^\s*)|(\s*$)/g, "")
         });
      })
      
      callback(entity);
  });
}

function initWatch(file){

  fs.watch(file,function(){
    readTemplate(file,buildClass); 
  })
}

initWatch("./dbtablestruct/trigger.txt");

