module.exports={
	EnableRemoteSource		: true,
	RemoteUrl				: "http://api.cschao.com/v1/columns/<%=TableName %>/financialcooperationdb",
	MssqlRemoteUrl			: "http://api.cschao.com/v1/columns/<%=TableName %>/<%=DBName %>/mssql",
	TableNames				: [
								// "FinancialSupplier",
								// "FinancialEmployee",
								// "FinancialCustomer",
								// "InteractionLog",
								// "ExchangeRate",
								// "BusinessSupplier",
								// "BusinessEmployee",
								// "BusinessCustomer",
								// "AsstactType",
								"Bill"
								// // "BillType",
								// // "Currency",
								// "PayableBill",
								// "PaymentBill",
								// // "PaymentType",
								// // "RecBillType",
								// "ReceivableBill",
								// "ReceivedBill"
								// ,"SystemInfo"
								// "PayableBillErpData",
								// "PaymentBillErpData",
								// "ReceivableBillErpData",
								// "ReceivedBillErpData"
								],
	NativeDbTableStructDir	: "./dbtablestruct"
}