const cache = {}

const BlogPostCache = {
  find: async (id) => cache[id],
  save: async (blogPost) => {
    cache[blogPost.id] = blogPost
    return true
  },
  remove: async (blogPost) => {
    cache[blogPost.id] = undefined
    return true
  }
}
module.exports = BlogPostCache
