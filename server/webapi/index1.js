import { Router } from 'express'

import advantageExpertInfo from './home/advantageExpertInfo'
import betweenExpertBanner from './home/betweenExpertBanner'
import contactBill from './experts/contactBill'
import detailedExpertInfo from './experts/detailedExpertInfo'
import expertAttribute from './experts/expertAttribute'
import favorite from './search/favorite'
import indexBanner from './home/indexBanner'
import indexBannerBottom from './home/indexBannerBottom'
import indexBottomMenu from './home/indexBottomMenu'
import indexIndustryExp from './home/indexIndustryExp'
import InterviewBill from './experts/InterviewBill'
import pageExpertInfo from './search/pageExpertInfo'
import pageResearchReport from './experts/pageResearchReport'
import researchReport from './experts/researchReport'
import userInfo from './userInfo'
import validateLoginInfo from './validateLoginInfo'

const router = Router()

// Add Routes
router.use(advantageExpertInfo)
router.use(betweenExpertBanner)
router.use(contactBill)
router.use(detailedExpertInfo)
router.use(expertAttribute)
router.use(favorite)
router.use(indexBanner)
router.use(indexBannerBottom)
router.use(indexBottomMenu)
router.use(indexIndustryExp)
router.use(InterviewBill)
router.use(pageExpertInfo)
router.use(pageResearchReport)
router.use(researchReport)
router.use(userInfo)
router.use(validateLoginInfo)

export default router
