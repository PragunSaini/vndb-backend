import { database } from './db'
import { QueryResult } from 'pg'
import { DatabaseError } from '../utils/errors'

interface VNResult {
  vn?: any
  wikidata?: any
  staff?: any
}

const getvn = async (id: number): Promise<VNResult> => {
  const client = await database.getClient()
  const res: VNResult = {}
  let temp: QueryResult<any>

  temp = await client.query('SELECT * FROM vn WHERE id = $1', [id])
  if (temp.rows.length == 0) {
    client.release()
    throw new DatabaseError('VNNOTFOUND', `VN with id ${id} does not exist`)
  }
  res.vn = temp.rows[0]

  temp = await client.query('SELECT * FROM wikidata WHERE id = $1', [parseInt(res.vn?.l_wikidata, 10)])
  res.wikidata = temp.rows[0]

  temp = await client.query(
    'SELECT vst.aid, vst.role, sta.name, sta.original, vst.note, st.* FROM \
    vn_staff vst JOIN staff st USING(aid) JOIN staff_alias sta USING(aid) WHERE vst.id = $1;',
    [id]
  )
  res.staff = temp.rows

  client.release()
  return res
}

export { getvn }
