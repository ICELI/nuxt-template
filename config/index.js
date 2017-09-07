let env = process.env.Node_CONFIG || 'dev';
let config = env === 'test'
  ? require('./address.test')
  : env === 'pre'
    ? require('./address.pre')
    : env === 'prod'
      ? require('./address.prod')
      : require('./address.dev')
module.exports = config

