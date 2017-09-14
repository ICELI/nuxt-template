import * as axios from 'axios'
import address from '../config'

let options = {
  timeout: 5000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  },
  params: +new Date()
}
// The server-side needs a full url to works
if (!process.browser) {
  options.baseURL = address.SERVER_ADDRESS
}

console.log(`axios ${process.browser}`, options)

export default axios.create(options)
