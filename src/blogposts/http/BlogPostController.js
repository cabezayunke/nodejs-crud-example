const dependencies = require('../dependencies')

// create routes
const blogPostControllerBuilder = ({ service }) => ({
    getBlogPost: ({ data: { id }}) => service.getBlogPost(id),
    createBlogPost: ({ data }) => service.createBlogPost(data),
    updateBlogPost: ({ data }) => service.updateBlogPost(data),
    deleteBlogPost: async ({ data: { id }}) => {
      await service.deleteBlogPost(id)
      return { status: 204 }
    },
})
const BlogPostController = blogPostControllerBuilder(dependencies)

module.exports = BlogPostController
