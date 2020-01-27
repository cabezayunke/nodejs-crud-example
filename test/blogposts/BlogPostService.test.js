const BlogPostService = require('../../src/blogposts/BlogPostService')
const BlogPostValidator = require('../../src/blogposts/BlogPostValidator')

describe('BlogPostService', () => {
  let service
  beforeAll(async () => {
  })
  afterAll(async () => {
  })
  afterEach(async () => expect.hasAssertions())

  test('should throw not found error when trying to fetch blog post that does not exist', async () => {
    service = BlogPostService({
      dao: {
        getBlogPost: async (id) => null,
      },
      validator: BlogPostValidator,
    })
    await expect(service.getBlogPost("missing")).rejects.toThrow('Blog post not found')
  })
  test('should return draft blog post if exists', async () => {

  })
  test('should create a blog post with valid data', async () => {

  })
  test('should not create blog post without title', async () => {

  })
  test('should not create blog post without body', async () => {

  })
  test('should update a blog post with a valid title', async () => {

  })
  test('should update a blog post with a valid body', async () => {

  })
  test('should not update blog post with empty title', async () => {

  })
  test('should not update blog post with invalid title', async () => {

  })
  test('should not update blog post with title with less than 10 chars', async () => {

  })
  test('should delete blog post if exists', async () => {

  })
  test('should throw not found error when trying to delete a blog post that does not exist', async () => {

  })
})
