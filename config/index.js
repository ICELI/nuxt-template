let env = process.env.Node_CONFIG || 'dev'
let config

switch (env) {
  case 'test':
    config = require('./address.test')
    break
  case 'pre':
    config = require('./address.pre')
    break
  case 'prod':
    config = require('./address.prod')
    break
  default:
    config = require('./address.dev')
}

module.exports = config

