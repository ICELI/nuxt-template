import express from 'express'
import bodyParser from 'body-parser'
import { Nuxt, Builder } from 'nuxt'

import api from './webapi'
import sso from './sso'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Import API Routes
app.use('/webapi', api)
app.use('/sso', sso)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = process.env.NODE_CONFIG === 'dev'
console.log('nuxt.config.js', config.env)

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
