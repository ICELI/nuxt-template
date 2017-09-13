import { Router } from 'express'
import axios from '../../../plugins/axios'

const router = Router()

router.get('/v2/pageExpertInfo', function (req, res) {
  console.log('pageExpertInfo', req.query)
  return axios.get('/webapi/v2/pageExpertInfo', {
    params: {
      ...req.query
    }
  }).then((response) => {
    console.log('response', response.data)
    res.json(response.data)
  }).catch((err) => {
    console.log('catch', err)
    res.json(err)
  })
})

export default router
