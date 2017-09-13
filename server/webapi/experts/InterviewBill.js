import { Router } from 'express'
import axios from '../../../plugins/axios'

const router = Router()

router.post('/v2/InterviewBill', function (req, res) {
  return axios.post('/v2/InterviewBill').then((response) => {
    console.log(response.data)
    res.json(response.data)
  }).catch((err) => {
    console.log(err.data)
    res.json(err.data)
  })
})

export default router
