const Joi = require('joi')

const mandatoryBlogPostId = Joi.object({
  id: Joi.string().required(),
})
const mandatoryBlogPostFields = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
})
const BlogPostValidation = {
  mandatoryBlogPostId,
  mandatoryBlogPostFields,
}
module.exports = BlogPostValidation
