const BlogPostDAO = require('./drivers/database/BlogPostDAO')
const BlogPostCache = require('./drivers/cache/BlogPostCache')
const BlogPostValidator = require('./business/BlogPostValidator')
const BlogPostRepository = require('./adapters/BlogPostRepository')({
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
