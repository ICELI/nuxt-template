/**
  * 只在生产模式下使用
  */

if (process.env.NODE_CONFIG === 'prod') {
  let _hmt = _hmt || [];
  (function (document) {
    let hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?b58ddc525cfe5199ea05b77a87a721c2'
    let s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })(window.document)

  /*
   *  应用挂载后
   */

  window.onNuxtReady(app => {
    /*
     * 每次页面路由切换
     */
    app.$nuxt.$on('routeChanged', (to, from) => {
      _hmt.push(['_trackPageview', to.fullpath])
    })
  })
}
