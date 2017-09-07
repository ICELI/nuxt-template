import address from '~/config'

export default {
  hasLogin (config) {
    const Login = new Promise(function (resolve, reject) {
      const script = document.createElement('script')
      script.id = '_hasLoginJs'
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.defer = true
      script.async = true
      script.src = address.USERCENTER_ADDRESS + '/hasLogin?serviceContext=&_t=' + Date.now()
      document.body.appendChild(script)

      window.userNotLoginCallback = function (token) {
        document.body.removeChild(script)
        console.log('沒有登录哦！')
        reject(token)
      }

      window.userLoginSuccessCallback = function (token) {
        document.body.removeChild(script)
        console.log('已经登录了')
        resolve(token)
      }
    })

    return Login
  }
}
