import { Router } from 'express'
import axios from './axios'

const router = Router()

function routerWrapper (type, path, context) {
  return router[type](path, function (req, res) {
    let regex = /(\:[^\/]*)/ig

    /**
     * "/v2/:detailedExpertInfo/:id"
     * "/v2/nicePath/123"  =>  "/v2/${req.params.nicePath}/${req.params.id}"
     */
    path = path.replace(regex, function (id) {
      return req.params[id.substring(1)]
    })

    return axios[type](context + path, {
      params: {
        ...req.query // 透传search参数
      }
    }).then((response) => {
      console.log(response.data)
      res.json(response.data)
    }).catch((err) => {
      console.log(err.data)
      res.json(err.data)
    })
  })

}

export default function (type, path, context) {
  routerWrapper(type, path, context)
  return router
}

