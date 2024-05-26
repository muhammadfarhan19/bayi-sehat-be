import { Request, Response } from 'express'

export const homePageHandler = (req: Request, res: Response): void => {
  res.send('Birds home page')
}
