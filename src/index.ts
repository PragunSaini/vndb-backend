import express from 'express'
import { PORT } from './utils/config'

const app = express()

app.get('/', (req, res) => {
  res.send('WOW MAN')
})

app.listen(PORT, () => {
  console.log('Listening...')
})
