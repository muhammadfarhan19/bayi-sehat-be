import { Router } from 'express'
import { createBaby, deleteBaby, getBaby, getBabyDetail, getFemaleBaby, getMaleBaby, updateBaby } from '../controllers/baby.controller'
import { requireUser } from '../middleware/auth'

export const BabyRouter: Router = Router()

BabyRouter.get('/', getBaby)
BabyRouter.get('/detail/:id', getBabyDetail)
BabyRouter.post('/create', createBaby)
BabyRouter.delete('/delete/:id', deleteBaby)
BabyRouter.put('/put/:id', updateBaby)
BabyRouter.get('/male', getMaleBaby)
BabyRouter.get('/female', getFemaleBaby)
