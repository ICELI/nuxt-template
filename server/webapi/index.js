import { Router } from 'express'

import advantageExpertInfo from './advantageExpertInfo'
import betweenExpertBanner from './betweenExpertBanner'
import contactBill from './contactBill'
import detailedExpertInfo from './detailedExpertInfo'
import expertAttribute from './expertAttribute'
import favorite from './favorite'
import indexBanner from './indexBanner'
import indexBannerBottom from './indexBannerBottom'
import indexBottomMenu from './indexBottomMenu'
import indexIndustryExp from './indexIndustryExp'
import InterviewBill from './InterviewBill'
import notFavorite from './notFavorite'
import pageExpertInfo from './pageExpertInfo'
import pageResearchReport from './pageResearchReport'
import researchReport from './researchReport'

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
router.use(notFavorite)
router.use(pageExpertInfo)
router.use(pageResearchReport)
router.use(researchReport)

export default router
