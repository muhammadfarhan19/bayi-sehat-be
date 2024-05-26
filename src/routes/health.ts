import { Router, NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

export const HealthRouter: Router = Router()

HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Health check succes')
  res.status(200).send({ status: '200', message: 'Bayi Sehat API is Ready' })
})
