module.exports={
	BuildEntityClass:{	
		Enable		:true, 
		OutPutFile	:"E:\\Coding\\lib-common\\node\\code-template-generator\\out\\Entity\\<%=TableName%>.cs",
		Template 	:"./template/mysql/entity.txt",
		Desc 		:"实体类"
	},
	BuildDataContract:{
		Enable		:true, 
		OutPutFile	:"./out/Contract/DataContracts/<%=TableName%>.cs",
		Template 	:"./template/mysql/datacontract.txt",
		Desc		:"数据契约"
	},
	BuildQueryReqResContract:{
		Enable		:true, 
		OutPutFile	:"./out/Contract/InputOutput/<%=TableName%>Query.cs",
		Template 	:"./template/mysql/querycontract.txt",
		Desc		:"查询请求响应"
	},
	BuildAddOrUpdateReqResContract:{
		Enable		:true, 
		OutPutFile	:"./out/Contract/InputOutput/Add<%=TableName%>.cs",//OrUpdate
		Template 	:"./template/mysql/addorupdatecontract.txt",
		Desc		:"新增修改请求响应"
	},
	BuildQueryCore:{
		Enable		:true,
		OutPutFile	:"./out/Core/<%=TableName%>Query.cs",
		Template 	:"./template/mysql/querycore.txt",
		Desc		:"查询core",
		ModuleId	:"MODEL_ID_<%=TableName%>_QUERY"
	},
	BuildAddOrUpdateCore:{
		Enable		:true, 
		OutPutFile	:"./out/Core/Add<%=TableName%>.cs",//OrUpdate
		Template 	:"./template/mysql/addorupdatecore.txt",
		Desc		:"新增修改core",
		ModuleId	:"MODEL_ID_ADD_<%=TableName%>"//ORUPDATE
	},
	BuildEntityTypeConfiguration:{
		Enable		:true, 
		OutPutFile	:"./out/EntityConfiguration/<%=TableName%>EntityTypeConfiguration.cs",
		Template 	:"./template/mysql/entitytypeconfiguration.txt",
		Desc		:"数据库实体映射文件"
	},
	BuildDataEFUnitTest:{
		Enable		:false, 
		OutPutFile	:"./out/EntityDataEFUnitTest/<%=TableName%>UnitTest.cs",
		Template 	:"./template/mysql/dataefunittest.txt",
		Desc		:"EF层测试单元"
	},
	BuildCoreUnitTest:{
		Enable		:true, 
		OutPutFile	:"./out/CoreUnitTest/<%=TableName%>UnitTest.cs",
		Template 	:"./template/mysql/coreunittest.txt",
		Desc		:"core层测试单元"
	},
	BuildService:{
		Enable		:true, 
		OutPutFile	:"./out/Service.cs",
		Template 	:"./template/mysql/service.txt",
		Desc		:"服务契约及其实现",
		QueryModuleId:"MODEL_ID_<%=TableName%>_QUERY",
		AddModuleId	:"MODEL_ID_ADD_<%=TableName%>"//ORUPDATE
	}
}