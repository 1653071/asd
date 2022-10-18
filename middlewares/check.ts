import { check } from "express-validator"
import { ConstructorDeclaration, isNamedExportBindings } from "typescript"
import { ObjectId } from "mongodb"
const { body, params } = require('express-validator/check')


const a = ["array", "object", "string", "number"]
const b = [Array, Object, String, Number]
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

const checkRequest = (req, reqType, nameValue: string, typeExpected: string, isRequired: any, valueInArray: [] | null) => {
    let value;
    let isValid: boolean = false
    let typeOfCheck = b[a.indexOf(typeExpected)]
    if (reqType === "headers") {
        value = req["headers"][nameValue]
    }
    else if (reqType === "body") {
        value = req["body"][nameValue]
    }
    else if (reqType === "params") {
        value = req["params"][nameValue]
    }
    else {
        return false
    }


    if (!value && isRequired === true) {
        isValid = false;
    }
    else {
        do {
            if (!(value instanceof typeOfCheck)) {
                isValid = false
                break
            }

            isValid = true
        }
        while (false)
    }


    /// Check type
    if (value instanceof typeOfCheck) {
        return true
    }
}
