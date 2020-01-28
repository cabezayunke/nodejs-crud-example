const Router = require('koa-router')
const dependencies = require('../../dependencies')
const { useController } = require('../../../common/setup/ControllerHandler')
const BlogPostController = require('../adapters/BlogPostController')(dependencies)

const router = new Router({ prefix: '/api/v1/blogposts' })

// create routes
router.get('/:id', (context) => useController(context,  BlogPostController.getBlogPost))
router.post('/', (context) => useController(context, BlogPostController.createBlogPost))
router.put('/:id', (context) => useController(context, BlogPostController.updateBlogPost))
router.delete('/:id', (context) => useController(context, BlogPostController.deleteBlogPost))

module.exports = router
