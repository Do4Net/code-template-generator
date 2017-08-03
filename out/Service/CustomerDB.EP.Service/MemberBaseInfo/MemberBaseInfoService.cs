using CustomerDB.EP.Entity;
using Public.Xin.Common.CacheHelper;
using Public.Xin.Common.OrerBy;
using SchoolAppManagerWeb.Common;
using Shangpin.EP.Framework.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerDB.EP.Service
{
    public class MemberBaseInfoService : IMemberBaseInfoService
    {

        public List<MemberBaseInfo> PageListQuery( string condition )
        {
            return DapperFactoy.CreateDapper().Query<MemberBaseInfo>("CustomerDB_MemberBaseInfo_Query", new { MemberId = modelID }).ToList();
        }

        public int Add(MemberBaseInfo model )
        {
            return DapperFactoy.CreateDapper().Execute("CustomerDB_MemberBaseInfo_Add", model);
        }

        public int Update(MemberBaseInfo model )
        {
            return return DapperFactoy.CreateDapper().Execute("CustomerDB_MemberBaseInfo_Update", model);
        }

        public int Delete( int id , string userId )
        {
            return DapperFactoy.CreateDapper().Execute("CustomerDB_MemberBaseInfo_Delete", new { LastUpdateUser = userId, Id = id });
        }
    }
}