import { Request, Response } from 'express'
import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/auth.validation'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import prisma from '../lib/prisma'
import { signJWT, verifyJWT } from '../utils/jwt'

export const userRegistration = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.info('ERR: user - registration = ', error.details[0].message)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }

  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: value.email
      }
    })

    if (emailExists) {
      logger.info('ERR: Email already used')
      return res.status(422).json({
        status: false,
        statusCode: 422,
        message: 'Email telah terdaftar'
      })
    }

    const phoneNumberExists = await prisma.user.findUnique({
      where: {
        phone_number: value.phone_number
      }
    })

    if (phoneNumberExists) {
      logger.info('ERR: Phone number already used')
      return res.status(422).json({
        status: false,
        statusCode: 422,
        message: 'Nomor HP telah terdaftar'
      })
    }

    value.password = `${hashing(value.password)}`
    await prisma.user.create({
      data: {
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
        phone_number: value.phone_number
      }
    })
    logger.info('User created')
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Berhasil Mendaftar'
    })
  } catch (error: any) {
    logger.info('ERR: auth - registration = ', error)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}

export const createUserSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.info('ERR: login = ', error.details[0].message)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }

  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email: value.email
      }
    })
    const isValid = checkPassword(value.password, user?.password)
    if (!isValid || !user) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Email atau Kata Sandi Salah!!'
      })
    }
    const accessToken = signJWT({ id: user.id, role: user.role }, { expiresIn: '1d' })
    const refreshToken = signJWT({ id: user.id, role: user.role }, { expiresIn: '1d' })
    const userRole = user.role

    logger.info('SUCCESS: User Login')
    return res
      .status(200)
      .json({ status: true, statusCode: 200, message: 'Login Berhasil', data: { accessToken, refreshToken, userRole } })
  } catch (error: any) {
    logger.error(error)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)

  if (error) {
    logger.info('ERR: auth - refresh token = ', error.details[0].message)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken)
    const user = await prisma.user.findUnique({
      where: {
        email: decoded._doc.email
      }
    })
    if (!user) return false

    const accessToken = signJWT({ id: user.id, role: user.role }, { expiresIn: '1d' })
    const refreshToken = signJWT({ id: user.id, role: user.role }, { expiresIn: '7d' })
    const userRole = user.role
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Refresh Session Successfully',
      data: { accessToken, refreshToken, userRole }
    })
  } catch (error: any) {
    logger.info('ERR: refresh - token = ', error.message)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}
