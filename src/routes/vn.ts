import { Router } from 'express'
import { dbstats } from '../db/stats'
import { getvn } from '../db/vn'
import { redis } from '../utils/redis'

const vnRouter = Router()

vnRouter.get('/', async (req, res) => {
  res.json(await dbstats())
})

vnRouter.get('/:id', async (req, res, next) => {
  try {
    const vnid = parseInt(req.params.id, 10)
    // if (await redis.exists(`v${vnid}`)) {
    if (vnid == undefined) {
      res.json(JSON.parse((await redis.get(`v${vnid}`)) as string))
    } else {
      const data = await getvn(vnid)
      redis.set(`v${vnid}`, JSON.stringify(data))
      res.json(data)
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export { vnRouter }
