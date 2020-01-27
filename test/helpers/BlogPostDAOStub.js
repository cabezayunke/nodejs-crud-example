
const BlogPostDAOStub = {
  getBlogPost: async (id) => null,
  createBlogPost: async (blogPost) => blogPost,
  updateBlogPost: async (id, blogPost) => ({ ...blogPost, _id: id }),
  deleteBlogPost: async (id) => true,
}
module.exports = BlogPostDAOStub
