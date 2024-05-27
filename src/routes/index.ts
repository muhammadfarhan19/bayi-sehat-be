import { Router } from 'express'
import {
  createBaby,
  deleteBaby,
  getBaby,
  getBabyDetail,
  getFemaleBaby,
  getMaleBaby,
  updateBaby
} from '../controllers/baby.controller'
import { createUserSession, refreshSession, userRegistration } from '../controllers/auth.controller'
import { requireBaby } from '../middleware/baby'
import {
  DeleteBabyCondition,
  createBabyCondition,
  getBabyConditions,
  getDetailBabyCondition,
  updateBabyCondition
} from '../controllers/condition.controller'

const router = Router()

router.get('/', (req, res) => {
  res.send('Bayi Sehat API is Ready')
})

router.post('/auth/register', userRegistration)
router.post('/auth/login', createUserSession)
router.post('/auth/refresh', refreshSession)

router.get('/baby', getBaby)
router.get('/baby/detail/:id', getBabyDetail)
router.post('/baby/create', createBaby)
router.delete('/baby/delete/:id', deleteBaby)
router.put('/baby/put/:id', updateBaby)
router.get('/baby/male', getMaleBaby)
router.get('/baby/female', getFemaleBaby)

router.post('/condition/create/:id', requireBaby, createBabyCondition)
router.delete('/condition/delete/:id', requireBaby, DeleteBabyCondition)
router.get('/condition/:id', requireBaby, getBabyConditions)
router.get('/condition/detail/:id', requireBaby, getDetailBabyCondition)
router.put('/condition/update/:id', requireBaby, updateBabyCondition)

export default router
