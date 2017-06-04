using HY.FinancialCooperation.Common.FinancialCooperation;
using HY.FinancialCooperation.Common.FinancialCooperation.InputOutput;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Core.FinancialCooperation
{
    class AddOrUpdateBusinessCustomer : FinancialCooperationServiceHandlerBase<AddOrUpdateBusinessCustomerRequest, AddOrUpdateBusinessCustomerReply>
    {
        HY.FinancialCooperation.Data.Entities.BusinessCustomer data = null;
        IQueryable<HY.FinancialCooperation.Data.Entities.BusinessCustomer> query = null;
        HY.Common.Seedwork.IRepository<HY.FinancialCooperation.Data.Entities.BusinessCustomer> repository = null;
        public AddOrUpdateBusinessCustomer()
        {
            repository = base.FinancialCooperationRepositoryContext.GetRepository<HY.FinancialCooperation.Data.Entities.BusinessCustomer>();
            query = repository.GetQuery();
        }
        protected override int ModelId
        {
            get
            {
                return base.ModelId;
            }
        }
        protected override void BeforeHandle()
        {
            base.BeforeHandle();
        }
        protected override void RealRequestInvoke()
        {
            switch (request.ReSetIsvalid)
            {
                case true:
                    ReSetIsvalid();
                    break;
                default:
                    AddOrUpdateEntity();
                    break;
            }
            repository.UnitOfWork.Commit();
        }

        private void AddOrUpdateEntity()
        {
            if (data == null)
            {
                data = EntityMappers.EntityMapper.Map<BusinessCustomer, HY.FinancialCooperation.Data.Entities.BusinessCustomer>(request.BusinessCustomer);
             
                data.ID = request.BusinessCustomer.ID;    
                data.CustomerID = request.BusinessCustomer.CustomerID;    
                data.CustomerName = request.BusinessCustomer.CustomerName;    
                data.FK_FinancialCustomer = request.BusinessCustomer.FK_FinancialCustomer;      
                data.RelativeTime = request.BusinessCustomer.RelativeTime;          
                data.CreateUser = request.BusinessCustomer.CreateUser;     
                data.CreateTime = DateTime.Now;
                data.CreateUser = request.CustomerId; 
                data.IsValid = HY.BusinessBase.BusinessConst.ISVALID_TRUR; 
                repository.Add(data);
            }
            else
            {
                
                data.ModifyTime = DateTime.Now;
                data.ModifyUser = request.CustomerId;
            }
        }

        private void ReSetIsvalid()
        {
            data.IsValid = request.IsValid;
            data.ModifyTime = DateTime.Now;
            data.ModifyUser = request.CustomerId;
        }
    }
}