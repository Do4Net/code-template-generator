using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Data.Entities
{
    public partial class BusinessCustomer : EntityBase   
    {
   		 
   		 /// <summary>
        /// 	主键
        /// </summary>
        public int ID { get; set; } 
   		 
   		 /// <summary>
        /// 	客户表主键
        /// </summary>
        public Nullable<int> CustomerID { get; set; } 
   		 
   		 /// <summary>
        /// 	客户全称
        /// </summary>
        public string CustomerName { get; set; } 
   		 
   		 /// <summary>
        /// 	财务客户表主键
        /// </summary>
        public Nullable<int> FK_FinancialCustomer { get; set; } 
   		 
   		 /// <summary>
        /// 	创建时间
        /// </summary>
        public Nullable<DateTime> CreateTime { get; set; } 
   		 
   		 /// <summary>
        /// 	关联时间
        /// </summary>
        public Nullable<DateTime> RelativeTime { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        public Nullable<DateTime> ModifyTime { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        public string IsValid { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        public Nullable<int> ModifyUser { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        public Nullable<int> CreateUser { get; set; } 
   		
    }
}