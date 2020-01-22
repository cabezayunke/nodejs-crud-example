import { useController } from './src/common/ControllerUtils'
import {
  mandatoryBlogPostId,
  mandatoryBlogPostFields,
} from 'src/blogposts/BlogPostValidation'

import {
  getBlogPost,
  updateBlogPost,
  createBlogPost,
  deleteBlogPost,
} from 'src/blogposts/BlogPostController'


const validator = Koa2JoiValidate({
  passError: true, // NOTE: this tells the module to pass the error along for you
});
const router = new Router({ prefix: '/api/v1' });

/*
 * Blog posts
 */
router.get(
  '/blogposts/:id',
  validator.params(mandatoryBlogPostId),
  (context) => useController(context, getBlogPost)
);
router.post(
  '/blogposts',
  validator.body(mandatoryBlogPostFields),
  (context) => useController(context, createBlogPost)
);
router.put(
  '/blogposts/:id',
  validator.params(mandatoryBlogPostId),
  validator.body(mandatoryBlogPostFields),
  (context) => useController(context, updateBlogPost)
);
router.delete(
  '/blogposts/:id',
  validator.params(mandatoryBlogPostId),
  (context) => useController(context, deleteBlogPost)
);

