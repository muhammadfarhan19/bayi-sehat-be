import { Router } from 'express'
import { getAntropometric } from '../controllers/antropometri.controller'

export const AntropometricRouter: Router = Router()

AntropometricRouter.get('/', getAntropometric)
