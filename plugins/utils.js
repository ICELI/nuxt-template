export default {
  parseParams(params = {}, key) {
    return params[key] ? params[key].replace('.html', '').split('_') : []
  }
}
