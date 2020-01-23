const MongoConnection = require('./src/common/MongoConnection');

process.env.NODE_ENV = 'test';

MongoConnection.create(require('./config/database'));
