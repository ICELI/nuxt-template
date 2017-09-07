# Nuxt-template
> Vue2项目基础框架

## Usage

### 开发人员
1. `$ git clone http://git.jm.com/FE-team/nuxt-template.git` 下载项目代码
2. `$ yarn` 下载依赖包
3. `$ yarn run dev` 启动开发环境服务
4. `$ yarn run build` 项目构建
5. `$ yarn run start` 启动基于构建后代码的服务

### 运维人员
1. 构建代码
    - `$ git clone http://git.jm.com/FE-team/nuxt-template.git` 下载项目代码
    - `$ yarn` 下载所有依赖包
    - `$ yarn run build` 项目构建
2. 部署代码至对应服务器
    - Copy `.nuxt/dist` 至 静态资源服务
    - Copy `.nuxt/`,`build/`,`static/`,`package.json` 至 Node.js server
3. 启动/重载Node.js服务
    - `$ yarn install --production` 安装生产环境依赖包
    - `$ pm2 start build/main.js`  首次使用时，基于pm2启动服务
    - `$ pm2 reload 0` 有后续发布时，重载服务