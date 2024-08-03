import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Role } from './common'

dotenv.config()

export const signJWT = (payload: { id: string; role: Role }, options?: jwt.SignOptions) => {
  return jwt.sign(payload, process.env.JWT_PRIVATE as string, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC as string, {
      algorithms: ['RS256']
    }) as { id: string; role: Role }
    return { decoded }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { expired: true }
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token')
    }
    throw err
  }
}
