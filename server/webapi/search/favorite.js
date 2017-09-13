import { Router } from 'express'
import axios from '../../../plugins/axios'

const router = Router()

router.get('/v2/favorite/1/:id', function (req, res) {
  return axios.get(`/webapi/v2/favorite/1/${req.params.id}`).
    then((response) => {
      console.log(response.data)
      res.json(response.data)
    }).
    catch((err) => {
      console.log(err.data)
      res.json(err.data)
    })
})

router.delete('/v2/favorite/1/:id', function (req, res) {
  return axios.get(`/webapi/v2/notFavorite/1/${req.params.id}`).
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
