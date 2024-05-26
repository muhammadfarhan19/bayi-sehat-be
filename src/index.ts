import express, { Application } from 'express'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from './middleware/deserializedToken'
import router from './routes'
import { routes } from './routes/index copy'

const app: Application = express()
const port: number = 4000

const allowedOrigins = ['http://localhost:3000', 'https://bayi-sehat.vercel.app']

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
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
  })
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(deserializeToken)

// app.get('/', (req, res) => {
//   res.send('Express on Vercel')
// })

// app.use('/api', router)
routes(app)

app.listen(port, () => {
  logger.info(`listening on http://localhost:${port}`)
})

export default app
