using System;
using System.Linq;
using FluentNHibernate.Automapping;
using FluentNHibernate.Conventions;
using ATPBlog.Core;
using ATPBlog.Data.NHibernateMaps.Conventions;
using SharpArch.Core.DomainModel;
using SharpArch.Data.NHibernate.FluentNHibernate;

namespace ATPBlog.Data.NHibernateMaps
{

    public class AutoPersistenceModelGenerator : IAutoPersistenceModelGenerator
    {

        #region IAutoPersistenceModelGenerator Members

        public AutoPersistenceModel Generate()
        {
            return AutoMap.AssemblyOf<Class1>(new AutomappingConfiguration())
                .Conventions.Setup(GetConventions())
                .IgnoreBase<Entity>()
                .IgnoreBase(typeof(EntityWithTypedId<>))
                .UseOverridesFromAssemblyOf<AutoPersistenceModelGenerator>();
        }

        #endregion

        private Action<IConventionFinder> GetConventions()
        {
            return c =>
            {
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.ForeignKeyConvention>();
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.HasManyConvention>();
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.HasManyToManyConvention>();
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.ManyToManyTableNameConvention>();
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.PrimaryKeyConvention>();
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.ReferenceConvention>();
                c.Add<ATPBlog.Data.NHibernateMaps.Conventions.TableNameConvention>();
            };
        }
    }
}
