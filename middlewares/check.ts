import { check } from "express-validator"
import { isNamedExportBindings } from "typescript"
import { ObjectId } from "mongodb"
const { body, params } = require('express-validator/check')

export const validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('userName', 'userName doesnt exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
      ]
    }
  }
}

export const middleware = {
  checkPlaygroundId: (req, res, next) => {
    if (req.params.playgroundId && !isNaN(req.params.playgroundId)) {
      console.log(req.params.playgroundId)
      next()
    }
    else {
      return res.status(400).send("not a number")
    }
  },
  checkTeam: (req, res, next) => {
    if (req.params.team && !isNaN(req.params.team)) {
      console.log(req.params.playgroundId)
      next()
    }
    else {
      return res.status(400).send("team is not")
    }
  },
  checkMessageId: (req, res, next) => {
    if (req.params.messageId && ObjectId.isValid(req.params.messageId)) {

      next()
    }
    else {
      return res.status(400).send("not a number")
    }
  },
}
