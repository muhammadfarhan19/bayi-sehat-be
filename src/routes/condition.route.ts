import { Router } from 'express'
import {
  DeleteBabyCondition,
  createBabyCondition,
  getBabyConditions,
  getDetailBabyCondition,
  updateBabyCondition
} from '../controllers/condition.controller'
import { requireBaby } from '../middleware/baby'

export const BabyConditionRouter: Router = Router()

BabyConditionRouter.post('/create/:id', requireBaby, createBabyCondition)
BabyConditionRouter.delete('/delete/:id', requireBaby, DeleteBabyCondition)
BabyConditionRouter.get('/:id', requireBaby, getBabyConditions)
BabyConditionRouter.get('/detail/:id', requireBaby, getDetailBabyCondition)
BabyConditionRouter.put('/update/:id', requireBaby, updateBabyCondition)
