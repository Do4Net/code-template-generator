module.exports={
	DBName:"CustomerDB",
	BatchBuildDoNet	:true,
	BuildSqlTemplate:{	
		Enable		:true, 
		OutPutFile	:"E:\\Community\\CodeManager\\EP.Community\\EP.Community.Configuration\\Dapper\\_f_<%=TableName%>_nolock.xml",
		Template 	:"./template/mssql/sqltemplate.txt",
		Desc 		:"sql模板"
	},
	BuildSqlSelete:{	
		Enable		:true, 
		OutPutFile	:"./out/Mssql/<%=TableName%>.1.txt",
		Template 	:"./template/mssql/sqlselect.txt",
		Desc 		:"sql查询"
	},
	BuildEntityClass:{	
		Enable		:true, 
		OutPutFile	:"E:\\Community\\CodeManager\\EP.Community\\EP.Community.Entity\\Member\\<%=TableName%>.cs",
		Template 	:"./template/mssql/entity.txt",
		Desc 		:"实体类"
	},
	BuildContract:{
		Enable		:true, 
		OutPutFile	:"./out/CommunityService/<%=TableName%>.txt",
		Template 	:"./template/mssql/contract.txt",
		Desc		:"服务契约实现"
	}, 
	BuildIBusiness:{
		Enable		:true, 
		OutPutFile	:"E:\\Community\\CodeManager\\EP.Community\\EP.Community.Business\\<%=TableName%>\\I<%=TableName%>Business.cs",
		Template 	:"./template/mssql/ibusiness.txt",
		Desc		:"业务逻辑层接口"
	},
	BuildBusiness:{
		Enable		:true, 
		OutPutFile	:"E:\\Community\\CodeManager\\EP.Community\\EP.Community.Business\\<%=TableName%>\\<%=TableName%>Business.cs",
		Template 	:"./template/mssql/business.txt",
		Desc		:"业务逻辑层实现"
	},
	BuildIService:{
		Enable		:true, 
		OutPutFile	:"E:\\Community\\CodeManager\\EP.Community\\EP.Community.Service\\<%=TableName%>\\I<%=TableName%>Service.cs",
		Template 	:"./template/mssql/iservice.txt",
		Desc		:"数据操作层接口"
	},
	BuildService:{
		Enable		:true, 
		OutPutFile	:"E:\\Community\\CodeManager\\EP.Community\\EP.Community.Service\\<%=TableName%>\\<%=TableName%>Service.cs",
		Template 	:"./template/mssql/service.txt",
		Desc		:"数据操作层实现"
	}
}