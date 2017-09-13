import { Router } from 'express'
import axios from '../../../plugins/axios'

const router = Router()

router.get('/v2/detailedExpertInfo', function (req, res) {
  return axios.get(`/webapi/v2/detailedExpertInfo`, {
    params: {
      ...req.query
    }
  }).
    then((response) => {
      console.log(response.data)
      res.json(response.data)
    }).
    catch((err) => {
      console.log(err.data)
      res.json(err.data)
    })
})

export default router
