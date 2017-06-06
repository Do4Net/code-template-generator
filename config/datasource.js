module.exports={
	EnableRemoteSource		: false,
	RemoteUrl				: "http://192.168.12.123:8099/v1/columns/<%=TableName %>",
	TableNames				: [
								"FinancialSupplier",
								"FinancialEmployee",
								"FinancialCustomer",
								"InteractionLog",
								"ExchangeRate",
								"BusinessSupplier",
								"BusinessEmployee",
								"BusinessCustomer"],
	NativeDbTableStructDir	: "./dbtablestruct"
}