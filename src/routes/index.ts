import { Router } from 'express'
import { createBaby, deleteBaby, getBaby, getBabyDetail, updateBaby } from '../controllers/baby.controller'
import { createUserSession, refreshSession, userRegistration } from '../controllers/auth.controller'
import {
  DeleteBabyCondition,
  createBabyCondition,
  getBabyConditions,
  getDetailBabyCondition,
  updateBabyCondition
} from '../controllers/condition.controller'
import deserializeToken from '../middleware/deserializedToken'

const router = Router()

router.get('/', (req, res) => {
  res.send('Bayi Sehat API is Ready')
})

router.post('/auth/register', userRegistration)
router.post('/auth/login', createUserSession)
router.post('/auth/refresh', refreshSession)

router.use(deserializeToken)

router.get('/baby', getBaby)
router.get('/baby/detail/:id', getBabyDetail)
router.post('/baby/create', createBaby)
router.delete('/baby/delete/:id', deleteBaby)
router.put('/baby/put/:id', updateBaby)

router.post('/condition/create/:id', createBabyCondition)
router.delete('/condition/delete/:id', DeleteBabyCondition)
router.get('/condition/:id', getBabyConditions)
router.get('/condition/detail/:id', getDetailBabyCondition)
router.put('/condition/update/:id', updateBabyCondition)

export default router
