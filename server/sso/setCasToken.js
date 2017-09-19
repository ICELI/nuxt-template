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
      console.log('response', response.headers)
      response.headers['set-cookie'] && res.set('Set-Cookie', response.headers['set-cookie'])
      res.json(response.data)
    }).
    catch((err) => {
      console.log('catch', err)
      res.json(err)
    })
})

router.get('/ajaxLoginByToken', function (req, res) {
  return axios.get(`/sso/ajaxLoginByToken`, {
    params: {
      ...req.query
    }
  }).
    then((response) => {
      console.log('response', response.headers)
      response.headers['set-cookie'] && res.set('Set-Cookie', response.headers['set-cookie'])
      res.json(response.data)
    }).
    catch((err) => {
      console.log('catch', err)
      res.json(err)
    })
})

export default router
