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
    class BusinessCustomerQuery : FinancialCooperationServiceHandlerBase<BusinessCustomerQueryRequest, BusinessCustomerQueryReply>
    {
        IQueryable<HY.FinancialCooperation.Data.Entities.BusinessCustomer> query;
        public BusinessCustomerQuery()
        {
            query = base.FinancialCooperationRepositoryContext.GetRepository<HY.FinancialCooperation.Data.Entities.BusinessCustomer>().GetQuery();
        }
        protected override int ModelId
        {
            get
            {
                return FinancialCooperationConst.MODEL_ID_BUSINESSCUSTOMER_QUERY;
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
            reply.BusinessCustomers = new List<BusinessCustomer>();

            var list = query.ToList();
            list.ForEach(p =>
            {
                reply.BusinessCustomers.Add(EntityMappers.EntityMapper.Map<HY.FinancialCooperation.Data.Entities.BusinessCustomer, BusinessCustomer>(p));
            });
        }

        private void FilterData()
        {       
         
            if (request.ID>0)
            {
                query = query.Where(t => t.ID == request.ID);
            }          
         
            if (request.CustomerID.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.CustomerID == request.CustomerID);
            }          
         
            if (!string.IsNullOrWhiteSpace(request.CustomerName))
            {
                query = query.Where(t => t.CustomerName == request.CustomerName);
            }          
         
            if (request.FK_FinancialCustomer.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.FK_FinancialCustomer == request.FK_FinancialCustomer);
            }          
         
            if (request.CreateTime.HasValue)
            {
                query = query.Where(t => t.CreateTime == request.CreateTime);
            }          
         
            if (request.RelativeTime.HasValue)
            {
                query = query.Where(t => t.RelativeTime == request.RelativeTime);
            }          
         
            if (request.ModifyTime.HasValue)
            {
                query = query.Where(t => t.ModifyTime == request.ModifyTime);
            }          
         
            if (!string.IsNullOrWhiteSpace(request.IsValid))
            {
                query = query.Where(t => t.IsValid == request.IsValid);
            }          
         
            if (request.ModifyUser.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.ModifyUser == request.ModifyUser);
            }          
         
            if (request.CreateUser.GetValueOrDefault()>0)
            {
                query = query.Where(t => t.CreateUser == request.CreateUser);
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