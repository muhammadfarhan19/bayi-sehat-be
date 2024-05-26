import express, { Application } from 'express'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from './middleware/deserializedToken'
import { createUserSession, getUsers, refreshSession, userRegistration } from './controllers/auth.controller'
import {
  createBaby,
  deleteBaby,
  getBaby,
  getBabyDetail,
  getFemaleBaby,
  getMaleBaby,
  updateBaby
} from './controllers/baby.controller'
import { requireBaby } from './middleware/baby'
import {
  DeleteBabyCondition,
  createBabyCondition,
  getBabyConditions,
  getDetailBabyCondition,
  updateBabyCondition
} from './controllers/condition.controller'

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

app.get('/', (req, res) => {
  res.send('Bayi Sehat API is Ready to Use')
})

// app.get('/auth/', getUsers)
// app.post('/auth/register', userRegistration)
// app.post('/auth/login', createUserSession)
// app.post('/auth/refresh', refreshSession)

// app.get('/baby/', getBaby)
// app.get('/baby/detail/:id', getBabyDetail)
// app.post('/baby/create', createBaby)
// app.delete('/baby/delete/:id', deleteBaby)
// app.put('/baby/put/:id', updateBaby)
// app.get('/baby/male', getMaleBaby)
// app.get('/baby/female', getFemaleBaby)

// app.post('/condition/create/:id', requireBaby, createBabyCondition)
// app.delete('/condition/delete/:id', requireBaby, DeleteBabyCondition)
// app.get('/condition/:id', requireBaby, getBabyConditions)
// app.get('/condition/detail/:id', requireBaby, getDetailBabyCondition)
// app.put('/condition/update/:id', requireBaby, updateBabyCondition)

app.listen(port, () => {
  logger.info(`listening on http://localhost:${port}`)
})

export default app
