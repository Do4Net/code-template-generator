using CustomerDB.EP.Entity;
using CustomerDB.EP.Entity.Common;
using Public.Xin.Common.MvcResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerDB.EP.Service
{
	public interface IService<T> 
    {

        List< T > PageListQuery( string condition );

        int Add( T model );

        int Update( T model );

        int Delete( int id , string userId );
    }

    public interface IMemberBaseInfoService : IService<MemberBaseInfo>
    {
         
    }
}