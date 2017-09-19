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
console.log(context + path, req.body)
    return axios[type](context + path, type === 'post' ? req.body : {
      params: {
        ...req.query // 透传search参数
      }
    }).then((response) => {
      console.log(context + path, response)
      res.json(response.data)
    }).catch((err) => {
      console.log(context + path, err)
      res.json(err.data)
    })
  })

}

export default function (type, path, context) {
  routerWrapper(type, path, context)
  return router
}

