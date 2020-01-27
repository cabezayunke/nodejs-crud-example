const Router = require('koa-router')
const { useController } = require('../common/ControllerUtils')
const BlogPostDAO = require('./BlogPostDAO')
const BlogPostValidator = require('./BlogPostValidator')
const BlogPostService = require('./BlogPostService')({
  dao: BlogPostDAO,
  validator: BlogPostValidator,
})

const router = new Router({ prefix: '/api/v1/blogposts' })

// create routes
const getBlogPost = ({ data: { id }}) => BlogPostService.getBlogPost(id)
router.get('/:id', (context) => useController(context,  getBlogPost))

const createBlogPost = ({ data }) => BlogPostService.createBlogPost(data)
router.post('/', (context) => useController(context, createBlogPost))

const updateBlogPost = ({ data }) => BlogPostService.updateBlogPost(data)
router.put('/:id', (context) => useController(context, updateBlogPost))

const deleteBlogPost = async ({ data: { id }}) => {
  await BlogPostService.deleteBlogPost(id)
  return { status: 204 }
}
router.delete('/:id', (context) => useController(context, deleteBlogPost))

module.exports = router
