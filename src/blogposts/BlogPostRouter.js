const Koa2JoiValidate = require('koa2-joi-validate');
const Router = require('koa-router');
const { useController } = require('../common/ControllerUtils');
const BlogPostValidation = require('./BlogPostValidation');
const BlogPostController = require('./BlogPostController');

const validator = Koa2JoiValidate({ passError: true });
const router = new Router({ prefix: '/api/v1/blogposts' });

// create routes
router.get(
  '/:id',
  validator.params(BlogPostValidation.mandatoryBlogPostId),
  (context) => useController(context, BlogPostController.getBlogPost)
);
router.post(
  '/',
  validator.body(BlogPostValidation.mandatoryBlogPostFields),
  (context) => useController(context, BlogPostController.createBlogPost)
);
router.put(
  '/:id',
  validator.params(BlogPostValidation.mandatoryBlogPostId),
  validator.body(BlogPostValidation.mandatoryBlogPostFields),
  (context) => useController(context, BlogPostController.updateBlogPost)
);
router.delete(
  '/:id',
  validator.params(BlogPostValidation.mandatoryBlogPostId),
  (context) => useController(context, BlogPostController.deleteBlogPost)
);

module.exports = router;
