using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SharpArch.Core.DomainModel;
using System.ComponentModel.DataAnnotations;

namespace ATPBlog.Core
{
   
        public class BlogPost : Entity
        {
            public virtual string Content { get; set; }

            [DisplayFormat(DataFormatString = "{0:hh:mm tt MMMM dd,yyyy}")]
            public virtual DateTime DateCreated { get; set; }
        }
   
}
