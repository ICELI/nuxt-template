export default {
  parseParams(params = {}, key) {
    return params[key] ? params[key].replace('.html', '').split('_') : []
  },
  checkParams(params = {}, key) {
    return params[key].replace('.html', '') === key
  }
}
