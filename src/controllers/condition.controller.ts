/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { logger } from '../utils/logger'
import { createBabyConditionValidation } from '../validations/condition.validation'

export const createBabyCondition = async (req: Request, res: Response) => {
  const { error, value } = createBabyConditionValidation(req.body)

  const {
    params: { id }
  } = req

  if (error) {
    logger.error('Err = baby condition-create', error.details[0].message)
    return res.status(422).json({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const checkBaby = await prisma.baby.findUnique({
      where: {
        id
      }
    })

    if (!checkBaby) {
      return res.status(404).json({ status: false, statusCode: 404, message: 'Baby not found' })
    }

    const response = await prisma.baby_condition.create({
      data: {
        month: value.month,
        weight: value.weight,
        height: value.height,
        baby: {
          connect: {
            id
          }
        }
      }
    })
    logger.info('Add baby condition successfully')
    return res.status(201).json({ status: true, statusCode: 201, message: 'Berhasil Menambahkan Data' })
  } catch (error) {
    logger.error(error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

export const getBabyConditions = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const responses = await prisma.baby_condition.findMany({
      where: {
        baby_id: id
      }
    })

    logger.info('Get baby conditions successfully')
    return res.status(200).json({ status: true, statusCode: 200, data: responses })
  } catch (error) {
    logger.error('Err = baby-read', error)
    return res.status(422).json({ status: false, statuseCode: 422, message: error })
  }
}

export const getDetailBabyCondition = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const response = await prisma.baby_condition.findFirst({
      where: {
        id
      }
    })

    if (response) {
      logger.info('Get detail baby condition successfully')
      return res.status(200).json({ status: true, statusCode: 200, data: response })
    } else {
      logger.warn('No baby condition found for the given ID and condition ID')
      return res.status(404).json({ status: false, statusCode: 404, message: 'Baby condition not found' })
    }
  } catch (error) {
    logger.error('Err = baby condition-read', error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

export const DeleteBabyCondition = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const response = await prisma.baby_condition.delete({
      where: {
        id
      }
    })
    if (response) {
      logger.info('Delete Baby Condition Successfully')
      res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' })
    } else {
      logger.info('Baby Condition not Found')
      return res.status(404).json({ status: true, statusCode: 404, message: 'Gagal Menghapus Data' })
    }
  } catch (error) {
    logger.error('Err = baby-read', error)
    return res.status(422).json({ status: false, statuseCode: 422, message: error })
  }
}

export const updateBabyCondition = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = createBabyConditionValidation(req.body)

  if (error) {
    logger.error('Err = baby condition-create', error.details[0].message)
    return res.status(422).json({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    await prisma.baby_condition.update({
      where: {
        id
      },
      data: {
        month: value.month,
        weight: value.weight,
        height: value.height
      }
    })
    logger.info('Update baby condition successfully')
    return res.status(201).json({ status: true, statusCode: 201, message: 'Berhasil Memperbarui Kondisi' })
  } catch (error) {
    logger.error('ERR: update - condition = ', error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}
