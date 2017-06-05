using HY.FinancialCooperation.Common.FinancialCooperation;
using HY.FinancialCooperation.Common.FinancialCooperation.InputOutput;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Core.FinancialCooperation
{
    class AddOrUpdateExchangeRate : FinancialCooperationServiceHandlerBase<AddOrUpdateExchangeRateRequest, AddOrUpdateExchangeRateReply>
    {
        HY.FinancialCooperation.Data.Entities.ExchangeRate data = null;
        IQueryable<HY.FinancialCooperation.Data.Entities.ExchangeRate> query = null;
        HY.Common.Seedwork.IRepository<HY.FinancialCooperation.Data.Entities.ExchangeRate> repository = null;
        public AddOrUpdateExchangeRate()
        {
            repository = base.FinancialCooperationRepositoryContext.GetRepository<HY.FinancialCooperation.Data.Entities.ExchangeRate>();
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
                data = EntityMappers.EntityMapper.Map<ExchangeRate, HY.FinancialCooperation.Data.Entities.ExchangeRate>(request.ExchangeRate);
             
                data.ID = request.ExchangeRate.ID;    
                data.TargetCurrency = request.ExchangeRate.TargetCurrency;    
                data.SourceCurrency = request.ExchangeRate.SourceCurrency;    
                data.Rate = request.ExchangeRate.Rate;    
                data.EffectiveDate = request.ExchangeRate.EffectiveDate;    
                data.ExpiryDate = request.ExchangeRate.ExpiryDate;    
                data.Type = request.ExchangeRate.Type;    
                data.ExchangeMode = request.ExchangeRate.ExchangeMode;    
                data.PrecisionNum = request.ExchangeRate.PrecisionNum;          
                data.CreateUser = request.ExchangeRate.CreateUser;       
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