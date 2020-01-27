const BlogPostModel = require('./BlogPostModel')

const BlogPostRepository = {
  getBlogPost: (id) => BlogPostModel.findById(id),
  createBlogPost: (blogPost) => new BlogPostModel(blogPost),
  updateBlogPost: (id, blogPost) => BlogPostModel.findOneAndUpdate({ _id: id, }, { ...blogPost }),
  deleteBlogPost: (id) => BlogPostModel.findById(id).remove(),
}
module.exports = BlogPostRepository
