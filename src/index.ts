import express from 'express'
import { PORT } from './utils/config'
import { Console } from './utils/logger'

const app = express()

// app.get('/', async (req, res) => {
//   const client = await DB.getClient()
//   try {
//     const result = await client.query('Select * from vn where id = $1', [4])
//     client.release()
//     res.json(result)
//   } catch (err) {
//     Console.log(err)
//     res.json({ response: 'ERRED' })
//   }
//   await DB.end()
//   Console.log('ENDED')
// })

app.listen(PORT, () => {
  Console.info(`Listening on PORT ${PORT} ...`)
})
