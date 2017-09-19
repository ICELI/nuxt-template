import { Router } from 'express'
import r from '../../plugins/router'

const routers = {
  get: [
    '/v2/advantageExpertInfo',
    '/v2/betweenExpertBanner',
    '/v2/contactBill',
    '/v2/indexBanner',
    '/v2/indexBannerBottom',
    '/v2/indexBottomMenu',
    '/v2/pageExpertInfo',
    '/v2/pageResearchReport',
    '/v2/researchReport',
    '/v2/userInfo',
    '/v2/detailedExpertInfo/:id',
    '/v2/expertAttribute/:id',
    '/v2/favorite/1/:id',
    '/v2/notFavorite/1/:id'
  ],
  post: [
    '/v2/InterviewBill',
    '/v2/validateLoginInfo',
    '/v2/doLogin',
  ]
}

const router = Router()

for(let key in routers) {
  routers[key].forEach(function (v) {
    router.use(r(key, v, '/webapi'))
  })
}

export default router
