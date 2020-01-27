const BlogPostDAO = require('./BlogPostDAO')
const BlogPostValidator = require('./BlogPostValidator')
const BlogPostService = require('./BlogPostService')({
  dao: BlogPostDAO,
  validator: BlogPostValidator,
})

module.exports = {
  service: BlogPostService,
  dao: BlogPostDAO,
  validator: BlogPostValidator,
}
