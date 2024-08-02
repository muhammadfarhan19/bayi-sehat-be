import { NextFunction, Request, Response } from 'express'

export const requireAuthorization = (roleRequired: 'USER' | 'ADMIN' = 'USER') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (user.role !== roleRequired && roleRequired === 'ADMIN') {
      return res.status(403).json({ message: 'Only admin can access' })
    }

    return next()
  }
}
