const Koa2JoiValidate = require('koa2-joi-validate');
const Router = require('koa-router');
const App = require('./common/App');
const Logger = require('./common/Logger');
const { useController } = require('./common/ControllerUtils');
const BlogPostValidation = require('./blogposts/BlogPostValidation');
const BlogPostController = require('./blogposts/BlogPostController');

const validator = Koa2JoiValidate({
  passError: true, // NOTE: this tells the module to pass the error along for you
});
const router = new Router({ prefix: '/api/v1' });

/*
 * Blog posts
 */
router.get(
  '/blogposts/:id',
  validator.params(BlogPostValidation.mandatoryBlogPostId),
  (context) => useController(context, BlogPostController.getBlogPost)
);
router.post(
  '/blogposts',
  validator.body(BlogPostValidation.mandatoryBlogPostFields),
  (context) => useController(context, BlogPostController.createBlogPost)
);
router.put(
  '/blogposts/:id',
  validator.params(BlogPostValidation.mandatoryBlogPostId),
  validator.body(BlogPostValidation.mandatoryBlogPostFields),
  (context) => useController(context, BlogPostController.updateBlogPost)
);
router.delete(
  '/blogposts/:id',
  validator.params(BlogPostValidation.mandatoryBlogPostId),
  (context) => useController(context, BlogPostController.deleteBlogPost)
);

const app = App(router);
app.listen(3000, () => {
  Logger.info('App listining on port 3000')
});
