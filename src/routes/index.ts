import { Router } from 'express'
import { homePageHandler } from '../controllers/homepage.controller'
import { getBaby } from '../controllers/baby.controller'

const router = Router()

router.get('/home', homePageHandler)
router.get('/baby', getBaby)

export default router
