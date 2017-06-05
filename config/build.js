module.exports={
	BuildEntityClass:{	
		Enable		:true, 
		OutPutFile	:"./out/Entity/<%=TableName%>.cs",
		Template 	:"./template/entity.txt",
		Desc 		:"实体类"
	},
	BuildDataContract:{
		Enable		:true, 
		OutPutFile	:"./out/Contract/DataContracts/<%=TableName%>.cs",
		Template 	:"./template/datacontract.txt",
		Desc		:"数据契约"
	},
	BuildQueryReqResContract:{
		Enable		:true, 
		OutPutFile	:"./out/Contract/InputOutput/<%=TableName%>Query.cs",
		Template 	:"./template/querycontract.txt",
		Desc		:"查询请求响应"
	},
	BuildAddOrUpdateReqResContract:{
		Enable		:true, 
		OutPutFile	:"./out/Contract/InputOutput/AddOrUpdate<%=TableName%>.cs",
		Template 	:"./template/addorupdatecontract.txt",
		Desc		:"新增修改请求响应"
	},
	BuildQueryCore:{
		Enable		:true,
		OutPutFile	:"./out/Core/<%=TableName%>Query.cs",
		Template 	:"./template/querycore.txt",
		Desc		:"查询core",
		ModuleId	:"MODEL_ID_<%=TableName%>_QUERY"
	},
	BuildAddOrUpdateCore:{
		Enable		:true, 
		OutPutFile	:"./out/Core/AddOrUpdate<%=TableName%>.cs",
		Template 	:"./template/addorupdatecore.txt",
		Desc		:"新增修改core",
		ModuleId	:"MODEL_ID_ADDORUPDATE_<%=TableName%>"
	},
	BuildEntityTypeConfiguration:{
		Enable		:true, 
		OutPutFile	:"./out/EntityConfiguration/<%=TableName%>EntityTypeConfiguration.cs",
		Template 	:"./template/entitytypeconfiguration.txt",
		Desc		:"数据库实体映射文件"
	},
	BuildDataEFUnitTest:{
		Enable		:true, 
		OutPutFile	:"./out/EntityDataEFUnitTest/<%=TableName%>UnitTest.cs",
		Template 	:"./template/dataefunittest.txt",
		Desc		:"EF层测试单元"
	},
	BuildCoreUnitTest:{
		Enable		:true, 
		OutPutFile	:"./out/CoreUnitTest/<%=TableName%>UnitTest.cs",
		Template 	:"./template/coreunittest.txt",
		Desc		:"core层测试单元"
	},
	BuildService:{
		Enable		:true, 
		OutPutFile	:"./out/Service.cs",
		Template 	:"./template/service.txt",
		Desc		:"服务契约及其实现",
		QueryModuleId:"MODEL_ID_<%=TableName%>_QUERY",
		AddModuleId	:"MODEL_ID_ADDORUPDATE_<%=TableName%>"
	}
}