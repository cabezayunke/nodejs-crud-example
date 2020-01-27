const BlogPostRepository = require('./BlogPostRepository')
const ApiError = require('../common/ApiError')

const getBlogPost = async (id) => {
  // some logic here
  const blogPost = await BlogPostRepository.getBlogPost(id)
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}

const BlogPostService = {
  getBlogPost,
  createBlogPost: async (data) => {
    // some logic here
    const blogPost = await BlogPostRepository.createBlogPost(data)
    if(!blogPost) {
      throw ApiError.internal('Blog post could not be created')
    }
    // more logic here
    return blogPost
  },
  updateBlogPost: async ({ id, title, body }) => {
    // some logic here
    const blogPost = await BlogPostRepository.updateBlogPost(id, { title, body })
    if(!blogPost) {
      throw ApiError.notFound('Blog post not found')
    }
    // more logic here
    return blogPost
  },
  deleteBlogPost: async (id) => {
    await getBlogPost(id)
    await BlogPostRepository.deleteBlogPost(id)
  }
}
module.exports = BlogPostService
