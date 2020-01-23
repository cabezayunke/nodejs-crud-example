'use strict';
const mongoose = require('mongoose');
const Logger = require('./Logger');

const MongoConnection = {
  create: function (config) {
    const db = mongoose.connection;
    db.on('connecting', () => {
      Logger.log('connecting to MongoDB...')
    });
    db.on('error', (error) => {
      Logger.error('Error in MongoDb connection: ', error);
    });
    db.on('connected', () => {
      Logger.log('MongoDB connected!')
    });
    db.once('open', () => {
      Logger.log('MongoDB connection opened!')
    });
    db.on('reconnected', () => {
      Logger.log('MongoDB reconnected!')
    });
    db.on('disconnected', () => {
      Logger.log('MongoDB disconnected!')
    });

    // mongoose debug
    if(process.env.NODE_ENV !== 'prod') {
      mongoose.set('debug', true)
    }

    return mongoose.connect(
      `mongodb://${config.mongo.connection}:${config.mongo.port}/${config.mongo.database}`,
      {
        native_parser: true,
        user: config.mongo.username,
        pass: config.mongo.password,
        ssl: config.mongo.sslSupport,
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
