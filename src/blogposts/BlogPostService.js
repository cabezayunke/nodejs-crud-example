const ApiError = require('../common/ApiError')

const getBlogPostBuilder = ({ repository, validator }) => async (id) => {
  validator.validateBlogPostId(id)
  // some logic here
  const blogPost = await repository.getBlogPost(id)
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}
const createBlogPostBuilder = ({ repository, validator }) => async (data) => {
  validator.validateBlogPostFields(data)
  // some logic here
  const blogPost = await repository.createBlogPost(data)
  if(!blogPost) {
    throw ApiError.internal('Blog post could not be created')
  }
  // more logic here
  return blogPost
}
const updateBlogPostBuilder = ({ repository, validator }) => async ({ id, title, body }) => {
  validator.validateBlogPostUpdate(id, { title, body })
  // some logic here
  const blogPost = await repository.updateBlogPost(id, { title, body })
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}
const deleteBlogPostBuilder = ({ repository, validator }) => async (id) => {
  validator.validateBlogPostId(id)
  const result = await repository.deleteBlogPost(id)
  if(!result) {
    throw ApiError.notFound('Blog post not found')
  }
}

const BlogPostService = (dependencies) => ({
  getBlogPost: getBlogPostBuilder(dependencies),
  createBlogPost: createBlogPostBuilder(dependencies),
  updateBlogPost: updateBlogPostBuilder(dependencies),
  deleteBlogPost: deleteBlogPostBuilder(dependencies),
})
module.exports = BlogPostService
