const BlogPostDAO = require('./data/BlogPostDAO')
const BlogPostCache = require('./data/BlogPostCache')
const BlogPostValidator = require('./business/BlogPostValidator')
const BlogPostRepository = require('./business/BlogPostRepository')({
  dao: BlogPostDAO,
  cache: BlogPostCache,
})
const BlogPostService = require('./business/BlogPostService')({
  repository: BlogPostRepository,
  validator: BlogPostValidator,
})

module.exports = {
  service: BlogPostService,
  dao: BlogPostDAO,
  validator: BlogPostValidator,
  cache: BlogPostCache,
  repository: BlogPostRepository,
}
