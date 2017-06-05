using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
namespace HY.FinancialCooperation.Common.FinancialCooperation.InputOutput
{
    [DataContract]
    [Serializable]
    public class AddOrUpdateExchangeRateRequest : FinancialCooperationRequestBase
    {
        [DataMember]
        public string IsValid { get; set; }
        [DataMember]
        public bool ReSetIsvalid { get; set; }
        [DataMember]
        public ExchangeRate ExchangeRate { get; set; }
    }
    public class AddOrUpdateExchangeRateReply : FinancialCooperationReplyBase
    {
        
    }
}