using HY.BusinessBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace HY.FinancialCooperation.Common.FinancialCooperation.InputOutput
{
    [DataContract]
    [Serializable]
    public class ExchangeRateQueryRequest : FinancialCooperationRequestBase
    {
         
         /// <summary>
        ///     主键
        /// </summary>
        [DataMember]
        public int ID { get; set; } 
         
         /// <summary>
        ///     目标币
        /// </summary>
        [DataMember]
        public Nullable<int> TargetCurrency { get; set; } 
         
         /// <summary>
        ///     原币
        /// </summary>
        [DataMember]
        public Nullable<int> SourceCurrency { get; set; } 
         
         /// <summary>
        ///     汇率值
        /// </summary>
        [DataMember]
        public Nullable<decimal> Rate { get; set; } 
         
         /// <summary>
        ///     生效日期
        /// </summary>
        [DataMember]
        public Nullable<DateTime> EffectiveDate { get; set; } 
         
         /// <summary>
        ///     失效日期
        /// </summary>
        [DataMember]
        public Nullable<DateTime> ExpiryDate { get; set; } 
         
         /// <summary>
        ///     类型
        /// </summary>
        [DataMember]
        public Nullable<int> Type { get; set; } 
         
         /// <summary>
        ///     换算方式
        /// </summary>
        [DataMember]
        public Nullable<int> ExchangeMode { get; set; } 
         
         /// <summary>
        ///     精度
        /// </summary>
        [DataMember]
        public string PrecisionNum { get; set; } 
         
         /// <summary>
        ///     创建时间
        /// </summary>
        [DataMember]
        public Nullable<DateTime> CreateTime { get; set; } 
         
         /// <summary>
        ///     修改人
        /// </summary>
        [DataMember]
        public Nullable<int> ModifyUser { get; set; } 
         
         /// <summary>
        ///     修改时间
        /// </summary>
        [DataMember]
        public Nullable<DateTime> ModifyTime { get; set; } 
         
         /// <summary>
        ///     创建人
        /// </summary>
        [DataMember]
        public Nullable<int> CreateUser { get; set; } 
         
         /// <summary>
        ///     是否有效
        /// </summary>
        [DataMember]
        public string IsValid { get; set; } 
         

        [DataMember]
        public PagingInfo Paging { get; set; }
    }
    [DataContract]
    [Serializable]
    public class ExchangeRateQueryReply : FinancialCooperationReplyBase
    {
        [DataMember]
        public PagingInfo Paging { get; set; }
        [DataMember]
        public List<ExchangeRate> ExchangeRates { get; set; }
    }
}