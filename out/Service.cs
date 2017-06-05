------------------------------[Module const id]-----start--------------------------------------
		
		public const int MODEL_ID_FINANCIALSUPPLIER_QUERY  = MODUEL_ID_BASE + 1;
		public const int MODEL_ID_ADDORUPDATE_FINANCIALSUPPLIER  	= MODUEL_ID_BASE + 1;
        
		public const int MODEL_ID_FINANCIALEMPLOYEE_QUERY  = MODUEL_ID_BASE + 1;
		public const int MODEL_ID_ADDORUPDATE_FINANCIALEMPLOYEE  	= MODUEL_ID_BASE + 1;
        
		public const int MODEL_ID_FINANCIALCUSTOMER_QUERY  = MODUEL_ID_BASE + 1;
		public const int MODEL_ID_ADDORUPDATE_FINANCIALCUSTOMER  	= MODUEL_ID_BASE + 1;
        
------------------------------[Module const id]-----start--------------------------------------



------------------------------[ServiceContract]-----start--------------------------------------

		
	[OperationContract]
        FinancialSupplierQueryReply FinancialSupplierQuery(FinancialSupplierQueryRequest request);

        [OperationContract]
        AddOrUpdateFinancialSupplierReply AddOrUpdateFinancialSupplier(AddOrUpdateFinancialSupplierRequest request);
        
	[OperationContract]
        FinancialEmployeeQueryReply FinancialEmployeeQuery(FinancialEmployeeQueryRequest request);

        [OperationContract]
        AddOrUpdateFinancialEmployeeReply AddOrUpdateFinancialEmployee(AddOrUpdateFinancialEmployeeRequest request);
        
	[OperationContract]
        FinancialCustomerQueryReply FinancialCustomerQuery(FinancialCustomerQueryRequest request);

        [OperationContract]
        AddOrUpdateFinancialCustomerReply AddOrUpdateFinancialCustomer(AddOrUpdateFinancialCustomerRequest request);
        

------------------------------[ServiceContract]-----end--------------------------------------



------------------------------[ServiceContract Realization]-----start--------------------------------------

		
        public FinancialSupplierQueryReply FinancialSupplierQuery(FinancialSupplierQueryRequest request)
        {
            return new FinancialSupplierQuery().HandleRequest(request);
        }

        public AddOrUpdateFinancialSupplierReply AddOrUpdateFinancialSupplier(AddOrUpdateFinancialSupplierRequest request)
        {
            return new AddOrUpdateFinancialSupplier().HandleRequest(request);
        }
        
        public FinancialEmployeeQueryReply FinancialEmployeeQuery(FinancialEmployeeQueryRequest request)
        {
            return new FinancialEmployeeQuery().HandleRequest(request);
        }

        public AddOrUpdateFinancialEmployeeReply AddOrUpdateFinancialEmployee(AddOrUpdateFinancialEmployeeRequest request)
        {
            return new AddOrUpdateFinancialEmployee().HandleRequest(request);
        }
        
        public FinancialCustomerQueryReply FinancialCustomerQuery(FinancialCustomerQueryRequest request)
        {
            return new FinancialCustomerQuery().HandleRequest(request);
        }

        public AddOrUpdateFinancialCustomerReply AddOrUpdateFinancialCustomer(AddOrUpdateFinancialCustomerRequest request)
        {
            return new AddOrUpdateFinancialCustomer().HandleRequest(request);
        }
        

------------------------------[ServiceContract Realization]-----end--------------------------------------




------------------------------[Proxy]-----start--------------------------------------

		
        public FinancialSupplierQueryReply FinancialSupplierQuery(FinancialSupplierQueryRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<FinancialSupplierQueryRequest, FinancialSupplierQueryReply>
                  (request, proxy.Create().FinancialSupplierQuery, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_FINANCIALSUPPLIER_QUERY);
        }

		public AddOrUpdateFinancialSupplierReply AddOrUpdateFinancialSupplier(AddOrUpdateFinancialSupplierRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<AddOrUpdateFinancialSupplierRequest, AddOrUpdateFinancialSupplierReply>
                   (request, proxy.Create().AddOrUpdateFinancialSupplier, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_ADDORUPDATE_FINANCIALSUPPLIER);
        }
        
        public FinancialEmployeeQueryReply FinancialEmployeeQuery(FinancialEmployeeQueryRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<FinancialEmployeeQueryRequest, FinancialEmployeeQueryReply>
                  (request, proxy.Create().FinancialEmployeeQuery, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_FINANCIALEMPLOYEE_QUERY);
        }

		public AddOrUpdateFinancialEmployeeReply AddOrUpdateFinancialEmployee(AddOrUpdateFinancialEmployeeRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<AddOrUpdateFinancialEmployeeRequest, AddOrUpdateFinancialEmployeeReply>
                   (request, proxy.Create().AddOrUpdateFinancialEmployee, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_ADDORUPDATE_FINANCIALEMPLOYEE);
        }
        
        public FinancialCustomerQueryReply FinancialCustomerQuery(FinancialCustomerQueryRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<FinancialCustomerQueryRequest, FinancialCustomerQueryReply>
                  (request, proxy.Create().FinancialCustomerQuery, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_FINANCIALCUSTOMER_QUERY);
        }

		public AddOrUpdateFinancialCustomerReply AddOrUpdateFinancialCustomer(AddOrUpdateFinancialCustomerRequest request)
        {
            return BusinessActionExtentions.ExecRequestReplyMethod<AddOrUpdateFinancialCustomerRequest, AddOrUpdateFinancialCustomerReply>
                   (request, proxy.Create().AddOrUpdateFinancialCustomer, request.CustomerId.ToString(), request.ClientIP, FinancialCooperationConst.MODEL_ID_ADDORUPDATE_FINANCIALCUSTOMER);
        }
        

------------------------------[Proxy]-----start--------------------------------------