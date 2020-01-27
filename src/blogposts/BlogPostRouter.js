const Joi = require('joi')
const Koa2JoiValidate = require('koa2-joi-validate')
const Router = require('koa-router')
const { useController } = require('../common/ControllerUtils')
const ApiError = require('../common/ApiError')
const BlogPostModel = require('./BlogPostModel')

const validator = Koa2JoiValidate({ passError: true })
const mandatoryBlogPostId = Joi.object({
  id: Joi.string().required(),
})
const mandatoryBlogPostFields = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
})

const router = new Router({ prefix: '/api/v1/blogposts' })

// create routes
const getBlogPost = async ({ data: { id }}) => {
  const blogPost = await BlogPostModel.findById(id)
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  return blogPost
}
router.get(
  '/:id',
  validator.params(mandatoryBlogPostId),
  (context) => useController(context,  getBlogPost)
)
const createBlogPost = async ({ data }) => {
  const blogPost = new BlogPostModel(data)
  await blogPost.save()
  return blogPost
}
router.post(
  '/',
  validator.body(mandatoryBlogPostFields),
  (context) => useController(context, createBlogPost)
)
const updateBlogPost = async ({ data }) => {
  const blogPost = await BlogPostModel.findOneAndUpdate({ _id: data.id, }, {
    title: data.title,
    body: data.body,
  })
  if(!blogPost) {
    throw ApiError.internal('Blog post could not be updated')
  }
  return blogPost
}
router.put(
  '/:id',
  validator.params(mandatoryBlogPostId),
  validator.body(mandatoryBlogPostFields),
  (context) => useController(context, updateBlogPost)
)
const deleteBlogPost = async ({ data: { id }}) => {
  await BlogPostModel.findById(id).remove()
  return { status: 204 }
}
router.delete(
  '/:id',
  validator.params(mandatoryBlogPostId),
  (context) => useController(context, deleteBlogPost)
)

module.exports = router
