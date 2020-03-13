import { Router } from 'express'
import { dbstats } from '../db/stats'
import { getvn } from '../db/vn'

const vnRouter = Router()

vnRouter.get('/', async (req, res) => {
  res.json(await dbstats())
})

vnRouter.get('/:id', async (req, res, next) => {
  try {
    const vnid = parseInt(req.params.id, 10)
    res.json(await getvn(vnid))
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export { vnRouter }
