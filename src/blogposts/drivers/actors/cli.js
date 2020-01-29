#!/usr/bin/env node
/* eslint-disable no-console */
const minimist = require('minimist')
const HttpStatus = require('http-status-codes')
const { controller } = require('./CompositionRoot')
const args = minimist(process.argv.slice(2));
let cmd = args._[0] || 'help';

if (args.version || args.v) {
  cmd = 'version';
}
if (args.help || args.h) {
  cmd = 'help';
}
if (args.find || args.f) {
  cmd = 'find';
}

// TODO:
// add more commands here
switch (cmd) {
  case 'version':
    console.log('1.0')
    break;
  case 'help':
    console.log('Use REST API until CLI has been implemented please')
    break;
  case 'find':
    controller.getBlogPost({ data: { id: args.id }})
    .then((data) => {
        console.log('------------------')
        console.log('Blog post found:')
        console.log('------------------')
        console.log(`ID: ${data.id}`);
        console.log(`Title: ${data.title}`);
        console.log(`Body: ${data.body}`);
        console.log('------------------')
        return data
    })
    .catch((err) => {
      switch(err.status) {
        case HttpStatus.NOT_FOUND:
          console.warn('------------------')
          console.warn('Blog post NOT found')
          console.warn('------------------')
          break;
        case HttpStatus.BAD_REQUEST:
          console.warn('------------------')
          console.warn(`Invalid params: ${err.message}`)
          console.warn('------------------')
          break;
        default:
          console.error(err.message)
      }
    })
    break;
  default:
    console.error(`"${cmd}" is not a valid command!`);
    break;
}
