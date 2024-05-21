import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from './middleware/deserializedToken'

const app: Application = express()
const port: number = 4000

const allowedOrigins = ['http://localhost:4000', 'https://bayi-sehat.vercel.app']

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: '*',
    allowedHeaders: '*'
  })
)

// parse body req
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

routes(app)

app.listen(port, () => {
  logger.info(`listening on http://localhost:${port}`)
})

export default app
