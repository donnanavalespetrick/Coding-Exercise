using System;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ATPBlog.Core;
using SharpArch.Core.PersistenceSupport.NHibernate;
using SharpArch.Web.NHibernate;

namespace ATPBlog.Web.Controllers
{
    public class BlogPostController : Controller
    {
        private const string MessageRequiredError = "Please enter your message.";
        private readonly INHibernateRepository<BlogPost> blogPostRepository;
        public BlogPostController(INHibernateRepository<BlogPost> blogPostRepository)
        {
            this.blogPostRepository = blogPostRepository;
        }

        public ActionResult Index()
        {
            var posts = this.blogPostRepository.GetAll().OrderByDescending(post => post.DateCreated);
            foreach (var item in posts)
            {
                Server.HtmlDecode(item.Content);

            }
            return View(posts);
        }

        [Transaction]
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Create(string blogContent)
        {
            if (!String.IsNullOrEmpty(blogContent))
            {
                BlogPost post = new BlogPost();
                post.Content = blogContent;
                post.DateCreated = DateTime.Now;
                post = this.blogPostRepository.Save(post);
                return Json(new
                {
                    Content = post.Content,
                    DateCreated = post.DateCreated.ToString(),
                    ID = post.Id
                });
            }
            else
            {
                return Json(new { errorMessage = MessageRequiredError });
            }

        }


        [Transaction]
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var post = this.blogPostRepository.Get(id);
            if (post == null)
            {
                return Json(new { errorMessage = "Item not found." });
            }
            else
            {
                this.blogPostRepository.Delete(post);
                return Json(new { ID = id });
            }
        }

    }
}
