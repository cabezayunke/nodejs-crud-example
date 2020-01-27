const BlogPostDAO = require('./BlogPostDAO')
const ApiError = require('../common/ApiError')

const BlogPostService = {
  getBlogPost: async (id) => {
    // some logic here
    const blogPost = await BlogPostDAO.getBlogPost(id)
    if(!blogPost) {
      throw ApiError.notFound('Blog post not found')
    }
    // more logic here
    return blogPost
  },
  createBlogPost: async (data) => {
    // some logic here
    const blogPost = await BlogPostDAO.createBlogPost(data)
    if(!blogPost) {
      throw ApiError.internal('Blog post could not be created')
    }
    // more logic here
    return blogPost
  },
  updateBlogPost: async ({ id, title, name }) => {
    // some logic here
    const blogPost = await BlogPostDAO.updateBlogPost(id, { title, name })
    if(!blogPost) {
      throw ApiError.internal('Blog post could not be updated')
    }
    // more logic here
    return blogPost
  },
  deleteBlogPost: (id) => BlogPostDAO.deleteBlogPost(id)
}
module.exports = BlogPostService
