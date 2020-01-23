'use strict';
const mongoose = require('mongoose');
const Logger = require('./Logger');

const MongoConnection = {
  create: function (config) {
    const db = mongoose.connection;
    const tags = { tags: 'init,mongodb' };
    db.on('connecting', () => {
      Logger.log(`connecting to mongodb://${config.host}:${config.port}/${config.database}`, tags);
    });
    db.on('error', (error) => {
      Logger.error('Error in MongoDb connection: ' + error.toString(), { ...tags, error });
    });
    db.on('connected', () => {
      Logger.log('MongoDB connected!', tags);
    });
    db.once('open', () => {
      Logger.log('MongoDB connection opened!', tags);
    });
    db.on('reconnected', () => {
      Logger.log('MongoDB reconnected!', tags);
    });
    db.on('disconnected', () => {
      Logger.log('MongoDB disconnected!', tags);
    });

    // mongoose debug
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', (coll, method, query, doc, options) =>
        Logger.debug(
          `${coll}.${method}(${JSON.stringify(query)}): ${JSON.stringify(doc)}`,
          { tags: 'mongodb,mongoose' }
        )
      )
    }

    return mongoose.connect(
      `mongodb://${config.host}:${config.port}/${config.database}`,
      {
        native_parser: true,
        user: config.user,
        pass:config.password,
        ssl: config.sslSupport,
        sslValidate: false,
        autoReconnect: true, // reconnect on error
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      }
    )
  }
};
module.exports = MongoConnection;
