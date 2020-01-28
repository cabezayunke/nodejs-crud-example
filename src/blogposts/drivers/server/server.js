const App = require('../../../setup/App')
const DatabaseConnection = require('../../../setup/DatabaseConnection')
const Logger = require('../../../common/Logger')
const BlogPostRouter = require('./BlogPostRouter')

// db connection
DatabaseConnection.create(require('../../../../config/database'))

// create app
const app = App(BlogPostRouter)
app.listen(3000, () => {
  Logger.info('App listining on port 3000', { tags: 'init' })
})
