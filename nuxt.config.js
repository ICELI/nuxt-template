const address = require('./config')

console.log('address', address)
console.log('process.env.NODE_CONFIG', process.env.NODE_CONFIG)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

module.exports = {
  env: {
    NODE_CONFIG: process.env.NODE_CONFIG || 'dev'
  },
  // 设置缓存
  // 默认
  // cache: {
  //   max: 1000,       // 组件缓存数
  //   maxAge: 900000   // 15分钟
  // }
  cache: true,
  transition: 'page',
  /*
   ** Headers of the page
   */
  head: {
    title: '聚贸云智库---工业全产业链跨境专家平台',
    meta: [{
      charset: 'utf-8'
    }, {
      hid: 'keyword',
      name: 'keyword',
      content: '聚贸云智库,云智库,工业全产业链跨境专家平台'
    }, {
      hid: 'description',
      name: 'description',
      content: '聚贸云智库是聚贸旗下工业全产业链跨境专家平台，云智库汇聚了全球各行各业领域的顶尖专家和精英人士，为用户提供咨询、反馈信息、进行诊断、预测未来。'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: address.CDN_ADDRESS + 'favicon.ico'
    }]
  },

  router: {
    middleware: ['ssr-cookie', 'check-login']
  },
/*
  modules: [
    ['@nuxtjs/proxy']
  ],
  proxy: {
    '/webapi/v2': {
      target: address.SERVER_ADDRESS,
      ws: false
    },
    '/sso': {
      target: address.SERVER_ADDRESS,
      ws: false
    }
  },
*/

  /*
   ** Global CSS
   */
  css: ['~/node_modules/element-ui/lib/theme-default/index.css', '~/assets/css/main.css'],
  /*
   ** Add axios globally
   */
  plugins: [
    '~plugins/element-ui',
    '~plugins/filter',
    '~plugins/directive',
    '~plugins/checkLogin',
    '~plugins/utils',
    { src: '~plugins/baidu', ssr: false }],

  build: {
    filenames: {
      css: 'styles.[chunkhash].css'
    },
    extractCSS: true,
    vendor: ['axios', 'element-ui'],
    babel: {
      plugins: [
        ['component', [{
          libraryName: 'element-ui',
          styleLibraryName: 'theme-default'
        }]]
      ]
    },
    publicPath: address.CDN_ADDRESS
  },
  /*
   ** Run ESLINT on save
   */
  extend (config, ctx) {
    if (ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
