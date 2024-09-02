import { Request, Response } from 'express'
import { createBabyValidation } from '../validations/baby.validation'
import { logger } from '../utils/logger'
import prisma from '../lib/prisma'
import { calculateAgeInMonths, dateFormatter } from '../utils/commonFunctions'
import { Analyzer } from '..//modules/function'
import { Gender } from '../utils/common'

export const createBaby = async (req: Request, res: Response) => {
  const { error, value } = createBabyValidation(req.body)
  if (error) {
    logger.error('Err = baby-create', error.details[0].message)
    return res.status(422).json({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    await prisma.baby.create({
      data: {
        name: value.name,
        gender: value.gender,
        birthdate: value.birthdate,
        address: value.address
      }
    })
    logger.info('Success add new data')
    return res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data' })
  } catch (error) {
    logger.error('Err = baby-create', error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

export const getBaby = async (req: Request, res: Response) => {
  const gender = req.query
  try {
    let responses
    if (gender) {
      responses = await prisma.baby.findMany({
        where: {
          gender
        },
        orderBy: { name: 'asc' }
      })
    } else {
      responses = await prisma.baby.findMany({
        select: {
          id: true,
          name: true,
          gender: true,
          address: true,
          birthdate: true,
          baby_condition: true
        },
        orderBy: { name: 'asc' }
      })
      const result = responses.map((response) => {
        const lastCondition = response.baby_condition[response.baby_condition.length - 1]
        const age = calculateAgeInMonths(response.birthdate)

        let status = null
        if (lastCondition) {
          status = Analyzer({
            weight: lastCondition.weight,
            age,
            gender: response.gender === Gender.MALE ? 'M' : 'F'
          })
        }

        return {
          ...response,
          age,
          gender,
          weight: lastCondition ? lastCondition.weight : null,
          status: status ? status.BBperU : null
        }
      })
      logger.info('Success get baby data')
      return res.status(200).json({ status: true, statusCode: 200, data: result })
    }
  } catch (error) {
    logger.error(error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

export const updateBaby = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = createBabyValidation(req.body)
  if (error) {
    logger.error('Err = baby-update', error.details[0].message)
    return res.status(422).json({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const baby = await prisma.baby.update({
      where: {
        id
      },
      data: {
        name: value.name,
        gender: value.gender,
        birthdate: value.birthdate,
        address: value.address
      }
    })
    if (baby) {
      logger.info('Success update new baby')
      return res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' })
    } else {
      logger.error('Baby not found')
      return res.status(404).json({ status: true, statusCode: 404, message: 'Baby not found' })
    }
  } catch (error) {
    logger.error('Err = baby-update', error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

export const deleteBaby = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const response = await prisma.baby.delete({
      where: {
        id
      }
    })
    await prisma.baby_condition.deleteMany({
      where: {
        baby_id: id
      }
    })

    if (response) {
      logger.info('Success delete baby')
      return res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' })
    } else {
      logger.info('Baby not found')
      return res.status(404).json({ status: true, statusCode: 404, message: 'Baby not found' })
    }
  } catch (error) {
    logger.error('ERR: delete baby = ', error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

export const getBabyDetail = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const response = await prisma.baby.findUnique({
      where: { id },
      select: {
        name: true,
        gender: true,
        address: true,
        birthdate: true,
        baby_condition: true
      }
    })

    if (!response) {
      return res.status(404).json({ status: false, statusCode: 404, message: 'Baby not found' })
    }

    const lastCondition = response.baby_condition[response.baby_condition.length - 1]
    const age = calculateAgeInMonths(response.birthdate)
    const gender = Gender.MALE ? 'Laki-Laki' : 'Perempuan'

    let status = null
    if (lastCondition) {
      status = Analyzer({
        weight: lastCondition.weight,
        age,
        gender: Gender.MALE ? 'M' : 'F'
      })
    }

    const result = {
      ...response,
      age,
      birthdate: dateFormatter(response.birthdate),
      status: status ? status.BBperU : null
    }

    logger.info('Success get detail baby')
    return res.status(200).json({ status: true, statusCode: 200, data: result })
  } catch (error) {
    logger.error('ERR: detail-baby = ', error)
    return res.status(422).json({ status: false, statusCode: 422, message: error })
  }
}

// export const getMaleBaby = async (req: Request, res: Response) => {
//   try {
//     const response = await prisma.baby.findMany({
//       where: {
//         gender: Gender.MALE
//       }
//     })
//     logger.info('Success get male babies')
//     return res.status(200).json({ status: true, statusCode: 200, data: response })
//   } catch (error) {
//     logger.error('Err = male baby-get', error)
//     return res.status(422).json({ status: false, statusCode: 422, message: error })
//   }
// }

// export const getFemaleBaby = async (req: Request, res: Response) => {
//   try {
//     const response = await prisma.baby.findMany({
//       where: {
//         gender: Gender.FEMALE
//       }
//     })
//     logger.info('Success get female babies')
//     return res.status(200).json({ status: true, statusCode: 200, data: response })
//   } catch (error) {
//     logger.error('Err = female baby-get', error)
//     return res.status(422).json({ status: false, statusCode: 422, message: error })
//   }
// }
