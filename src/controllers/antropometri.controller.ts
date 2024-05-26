import { logger } from '../utils/logger'
import prisma from '../lib/prisma'
import { Request, Response } from 'express'

export const getAntropometric = async (req: Request, res: Response) => {
  try {
    const data = await prisma.baby.findMany()
    logger.info('Success get antropometric data')
    return res.status(200).send({ status: true, statusCode: 200, data })
  } catch (error) {}
}
