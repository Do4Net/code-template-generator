using HY.FinancialCooperation.Common;
using HY.FinancialCooperation.Common.FinancialCooperation;
using HY.FinancialCooperation.Common.FinancialCooperation.InputOutput;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Core.FinancialCooperation
{
    class ExchangeRateQuery : FinancialCooperationServiceHandlerBase<ExchangeRateQueryRequest, ExchangeRateQueryReply>
    {
        IQueryable<HY.FinancialCooperation.Data.Entities.ExchangeRate> query;
        public ExchangeRateQuery()
        {
            query = base.FinancialCooperationRepositoryContext.GetRepository<HY.FinancialCooperation.Data.Entities.ExchangeRate>().GetQuery();
        }
        protected override int ModelId
        {
            get
            {
                return FinancialCooperationConst.MODEL_ID_EXCHANGERATE_QUERY;
            }
        }
        protected override void BeforeHandle()
        {
            base.BeforeHandle();
            base.IsLogRequestReply = false;
            if (HasError)
                return;
        }
        protected override void RealRequestInvoke()
        {
            FilterData();
            Paging();
            if (HasError) return;
            reply.ExchangeRates = new List<ExchangeRate>();

            var list = query.ToList();
            list.ForEach(p =>
            {
                reply.ExchangeRates.Add(EntityMappers.EntityMapper.Map<HY.FinancialCooperation.Data.Entities.ExchangeRate, ExchangeRate>(p));
            });
        }

        private void FilterData()
        {       
         
            if (request.ID>0)
            {
                query = query.Where(t => t.ID == request.ID);
            }          
         
            if (request.TargetCurrency.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.TargetCurrency == request.TargetCurrency);
            }          
         
            if (request.SourceCurrency.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.SourceCurrency == request.SourceCurrency);
            }          
         
            if (request.Rate.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.Rate == request.Rate);
            }          
         
            if (request.EffectiveDate.HasValue)
            {
                query = query.Where(t => t.EffectiveDate == request.EffectiveDate);
            }          
         
            if (request.ExpiryDate.HasValue)
            {
                query = query.Where(t => t.ExpiryDate == request.ExpiryDate);
            }          
         
            if (request.Type.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.Type == request.Type);
            }          
         
            if (request.ExchangeMode.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.ExchangeMode == request.ExchangeMode);
            }          
         
            if (!string.IsNullOrWhiteSpace(request.PrecisionNum))
            {
                query = query.Where(t => t.PrecisionNum == request.PrecisionNum);
            }          
         
            if (request.CreateTime.HasValue)
            {
                query = query.Where(t => t.CreateTime == request.CreateTime);
            }          
         
            if (request.ModifyUser.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.ModifyUser == request.ModifyUser);
            }          
         
            if (request.ModifyTime.HasValue)
            {
                query = query.Where(t => t.ModifyTime == request.ModifyTime);
            }          
         
            if (request.CreateUser.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.CreateUser == request.CreateUser);
            }          
         
            if (!string.IsNullOrWhiteSpace(request.IsValid))
            {
                query = query.Where(t => t.IsValid == request.IsValid);
            }          
         
            
        }

        private void Paging()
        {
            if (request.Paging == null)
                return;

            if (request.Paging.Ascending)
                query = query.OrderBy(o => o.ID);
            else
                query = query.OrderByDescending(o => o.ID);

            reply.Paging = request.Paging;
            reply.Paging.DataCount = query.Count();

            query = query.Skip(reply.Paging.SkipCount).Take(reply.Paging.TakeCount);
        }
    }
}