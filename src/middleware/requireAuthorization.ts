import { NextFunction, Request, Response } from 'express'
import { Role } from '../utils/common'

export const requireAuthorization = (roleRequired: Role.USER | Role.ADMIN = Role.USER) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (user.role !== roleRequired && roleRequired === Role.ADMIN) {
      return res.status(403).json({ message: 'Only admin can access' })
    }

    return next()
  }
}
