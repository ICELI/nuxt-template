/**
 * 预发环境
 * 服务器地址 只能是域名 不能为IP
 * @type {{IMG_ADDRESS: string, SERVER_ADDRESS: string, USERCENTER_ADDRESS: string, CENTER_ADDRESS: string, CDN_ADDRESS: string, UPLOAD_ADDRESS: string}}
 */

module.exports = {
  // CDN 服务器
  CDN_ADDRESS: 'http://127.0.0.1:3000/_nuxt/',
  // API 服务器
  SERVER_ADDRESS: 'http://webapi.jmexpert.com',
  // 认证中心
  USERCENTER_ADDRESS: 'http://passport.jumore.com/cas/',
  // 中台地址
  CENTER_ADDRESS: 'http://center.jmexpert.com',
  // 图片上传服务器
  UPLOAD_ADDRESS: 'http://image5.jumore.com',
  // 图片服务器
  IMG_ADDRESS: 'http://img.jumore.com',
}
