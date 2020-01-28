const BlogPostDAO = require('./driven/actors/BlogPostDAO')
const BlogPostCache = require('./driven/actors/BlogPostCache')
const BlogPostValidator = require('./business/BlogPostValidator')
const BlogPostRepository = require('./driven/adapters/BlogPostRepository')({
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
