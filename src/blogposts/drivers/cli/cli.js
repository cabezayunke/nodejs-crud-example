
// eslint-disable no-console
const minimist = require('minimist')

const args = minimist(process.argv.slice(2));
let cmd = args._[0] || 'help';

if (args.version || args.v) {
  cmd = 'version';
}

if (args.help || args.h) {
  cmd = 'help';
}

// TODO:
// add real commands here
switch (cmd) {
  case 'version':
    console.log('1.0')
    break;
  case 'help':
    console.log('Use REST API until CLI has been implemented please')
    break;
  default:
    console.error(`"${cmd}" is not a valid command!`);
    break;
}
