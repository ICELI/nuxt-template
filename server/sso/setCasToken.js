import { Router } from 'express'
import axios from '../../plugins/axios'

const router = Router()

router.get('/setCasToken', function (req, res) {
  return axios.get(`/sso/setCasToken`, {
    params: {
      ...req.query
    }
  }).
    then((response) => {
      console.log('response', response.data)
      res.json(response.data)
    }).
    catch((err) => {
      console.log('catch', err)
      res.json(err)
    })
})

export default router
