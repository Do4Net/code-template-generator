using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Data.Entities
{
    public partial class ExchangeRate : EntityBase   
    {
   		 
   		 /// <summary>
        /// 	主键
        /// </summary>
        public int ID { get; set; } 
   		 
   		 /// <summary>
        /// 	目标币
        /// </summary>
        public Nullable<int> TargetCurrency { get; set; } 
   		 
   		 /// <summary>
        /// 	原币
        /// </summary>
        public Nullable<int> SourceCurrency { get; set; } 
   		 
   		 /// <summary>
        /// 	汇率值
        /// </summary>
        public Nullable<decimal> Rate { get; set; } 
   		 
   		 /// <summary>
        /// 	生效日期
        /// </summary>
        public Nullable<DateTime> EffectiveDate { get; set; } 
   		 
   		 /// <summary>
        /// 	失效日期
        /// </summary>
        public Nullable<DateTime> ExpiryDate { get; set; } 
   		 
   		 /// <summary>
        /// 	类型
        /// </summary>
        public Nullable<int> Type { get; set; } 
   		 
   		 /// <summary>
        /// 	换算方式
        /// </summary>
        public Nullable<int> ExchangeMode { get; set; } 
   		 
   		 /// <summary>
        /// 	精度
        /// </summary>
        public string PrecisionNum { get; set; } 
   		 
   		 /// <summary>
        /// 	创建时间
        /// </summary>
        public Nullable<DateTime> CreateTime { get; set; } 
   		 
   		 /// <summary>
        /// 	修改人
        /// </summary>
        public Nullable<int> ModifyUser { get; set; } 
   		 
   		 /// <summary>
        /// 	修改时间
        /// </summary>
        public Nullable<DateTime> ModifyTime { get; set; } 
   		 
   		 /// <summary>
        /// 	创建人
        /// </summary>
        public Nullable<int> CreateUser { get; set; } 
   		 
   		 /// <summary>
        /// 	是否有效
        /// </summary>
        public string IsValid { get; set; } 
   		
    }
}