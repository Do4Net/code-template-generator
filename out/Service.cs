------------------------------[Module const id]-----start--------------------------------------
		
		public const int MODEL_ID_BILL_QUERY  = MODUEL_ID_BASE + 1;
		public const int MODEL_ID_ADD_BILL  	= MODUEL_ID_BASE + 1;
        
------------------------------[Module const id]-----start--------------------------------------



------------------------------[ServiceContract]-----start--------------------------------------

		
	[OperationContract]
        BillQueryReply BillQuery(BillQueryRequest request);

        [OperationContract]
        AddOrUpdateBillReply AddOrUpdateBill(AddOrUpdateBillRequest request);
        

------------------------------[ServiceContract]-----end--------------------------------------



------------------------------[ServiceContract Realization]-----start--------------------------------------

		
        public BillQueryReply BillQuery(BillQueryRequest request)
        {
            return  return HY.Common.Components.ObjectContainer.Current.Resolve<BillQuery>().HandleRequest(request);
        }

        public AddOrUpdateBillReply AddOrUpdateBill(AddOrUpdateBillRequest request)
        {
            return  return HY.Common.Components.ObjectContainer.Current.Resolve<AddOrUpdateBill>().HandleRequest(request);
        }
        

------------------------------[ServiceContract Realization]-----end--------------------------------------




------------------------------[Proxy]-----start--------------------------------------

		
        public BillQueryReply BillQuery(BillQueryRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<BillQueryRequest, BillQueryReply>
                  (request, proxy.Create().BillQuery, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_BILL_QUERY);
        }

		public AddOrUpdateBillReply AddOrUpdateBill(AddOrUpdateBillRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<AddOrUpdateBillRequest, AddOrUpdateBillReply>
                   (request, proxy.Create().AddOrUpdateBill, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_ADD_BILL);
        }
        

------------------------------[Proxy]-----start--------------------------------------