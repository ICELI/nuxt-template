import { Router } from 'express'

import setCasToken from './setCasToken'

const router = Router()

// Add Routes
router.use(setCasToken)

export default router
