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
	}
}