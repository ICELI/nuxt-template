import { Router } from 'express'
import axios from '../../../plugins/axios'

const router = Router()

router.get('/v2/expertAttribute/:id', function (req, res) {
  return axios.get(`/webapi/v2/expertAttribute/${req.params.id}`).
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
