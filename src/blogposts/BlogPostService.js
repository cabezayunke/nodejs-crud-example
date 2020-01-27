const ApiError = require('../common/ApiError')

const getBlogPostBuilder = ({ dao, validator }) => async (id) => {
  validator.validateBlogPostId(id)
  // some logic here
  const blogPost = await dao.getBlogPost(id)
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}
const createBlogPostBuilder = ({ dao, validator }) => async (data) => {
  validator.validateBlogPostFields(data)
  // some logic here
  const blogPost = await dao.createBlogPost(data)
  if(!blogPost) {
    throw ApiError.internal('Blog post could not be created')
  }
  // more logic here
  return blogPost
}
const updateBlogPostBuilder = ({ dao, validator }) => async ({ id, title, body }) => {
  validator.validateBlogPostUpdate(id, { title, body })
  // some logic here
  const blogPost = await dao.updateBlogPost(id, { title, body })
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}
const deleteBlogPostBuilder = ({ dao, validator }) => async (id) => {
  validator.validateBlogPostId(id)
  const result = await dao.deleteBlogPost(id)
  if(!result) {
    throw ApiError.notFound('Blog post not found')
  }
  return true;
}

const BlogPostService = (dependencies) => ({
  getBlogPost: getBlogPostBuilder(dependencies),
  createBlogPost: createBlogPostBuilder(dependencies),
  updateBlogPost: updateBlogPostBuilder(dependencies),
  deleteBlogPost: deleteBlogPostBuilder(dependencies),
})
module.exports = BlogPostService
