const BlogPostModel = require('./BlogPostModel')

const BlogPostDAO = {
  getBlogPost: async (id) => BlogPostModel.findById(id).lean(),
  createBlogPost: async (blogPost) => {
    const newModel = new BlogPostModel(blogPost)
    await newModel.save()
    return newModel.toObject()
  },
  updateBlogPost: async (id, blogPost) => BlogPostModel.findByIdAndUpdate(id, blogPost, { new: true }).lean(),
  deleteBlogPost: async (id) => {
    const obj = await BlogPostModel.findById(id)
    if(!obj) {
      return false;
    }
    await obj.remove()
    return true
  },
}
module.exports = BlogPostDAO
