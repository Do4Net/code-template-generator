using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Common.FinancialCooperation
{
    [DataContract]
    public class BusinessCustomer : DataContractBase
    {
   		 
   		 /// <summary>
        /// 	主键
        /// </summary>
        [DataMember]
        public int ID { get; set; } 
   		 
   		 /// <summary>
        /// 	客户表主键
        /// </summary>
        [DataMember]
        public Nullable<int> CustomerID { get; set; } 
   		 
   		 /// <summary>
        /// 	客户全称
        /// </summary>
        [DataMember]
        public string CustomerName { get; set; } 
   		 
   		 /// <summary>
        /// 	财务客户表主键
        /// </summary>
        [DataMember]
        public Nullable<int> FK_FinancialCustomer { get; set; } 
   		 
   		 /// <summary>
        /// 	创建时间
        /// </summary>
        [DataMember]
        public Nullable<DateTime> CreateTime { get; set; } 
   		 
   		 /// <summary>
        /// 	关联时间
        /// </summary>
        [DataMember]
        public Nullable<DateTime> RelativeTime { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        [DataMember]
        public Nullable<DateTime> ModifyTime { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        [DataMember]
        public string IsValid { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        [DataMember]
        public Nullable<int> ModifyUser { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        [DataMember]
        public Nullable<int> CreateUser { get; set; } 
   		 
    }
}