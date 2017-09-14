let config

if (process.env.NODE_CONFIG === 'test') {
  config = require('./address.test')
} else if (process.env.NODE_CONFIG === 'pre') {
  config = require('./address.pre')
} else if (process.env.NODE_CONFIG === 'prod') {
  config = require('./address.prod')
} else if (process.env.NODE_CONFIG === 'dev') {
  config = require('./address.dev')
}

module.exports = config

