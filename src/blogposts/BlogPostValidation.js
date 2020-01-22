import Joi from 'joi';

const mandatoryBlogPostId = Joi.object({
  id: Joi.string().required(),
});
const mandatoryBlogPostFields = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});
export default {
  mandatoryBlogPostId,
  mandatoryBlogPostFields,
}
