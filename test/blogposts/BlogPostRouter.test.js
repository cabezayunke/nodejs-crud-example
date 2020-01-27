const HttpStatus = require('http-status-codes')
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest')
const MongoConnection = require('../../src/common/MongoConnection')
const dbConfig = require('../../config/database')
const App = require('../../src/common/App')
const BlogPostRouter = require('../../src/blogposts/BlogPostRouter')
const { blogPostsUp, blogPostsDown } = require('../fixtures/blogposts')

describe('BlogPostRouter', () => {
  let app, request, testData, db;
  beforeAll(async () => {
    db = await MongoConnection.create(dbConfig)
    app = App(BlogPostRouter)
    request = supertest(app.listen())
    testData = await blogPostsUp()
  })
  afterAll(async () => {
    await blogPostsDown()
    await db.close();
  })
  afterEach(async () => expect.hasAssertions())

  test('should throw not found error when trying to fetch blog post that does not exist', async () => {
    const res = await request.get('/api/v1/blogposts/1')
    expect(res.status).toEqual(HttpStatus.NOT_FOUND)
  })
  test('should return draft blog post if exists', async () => {
    const res = await request.get(`/api/v1/blogposts/${testData.blogPost._id}`)
    expect(res.body.title).toEqual(testData.blogPost.title)
    expect(res.body.body).toEqual(testData.blogPost.body)
    expect(res.body.status).toEqual('draft')
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
