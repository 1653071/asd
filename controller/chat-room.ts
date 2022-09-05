import Chat from '../schema/ChatRoom'
import { Request, Response, NextFunction } from "express";
const helper = require('../helpers/utils')
const JwtConfig = require('../config/jwt')
const jwt = require("jsonwebtoken");

module.exports = {
    saveMessageToDb: async (data: any) => {
        data.online = false
        if (data.user_id && data.to_user) {
            data.created_at = new Date()
            return await Chat.create(data)
        }
    },
    findAllUserByRoomId: async (room_id: any) => {
        const dataResult = await Chat.find({ room_id: room_id })
        if (dataResult.length > 0) {
            return dataResult
        }
    },
    findChatLog: async (data: any) => {
        const dataResult = await Chat.find({ room_id: data.room_id })
        return dataResult
    },
    findMessageByUserId: async (req: Request, res: Response) => {
        const { user_id, to_user } = req.body
        let filterCondition = [{
            user_id: user_id,
            to_user: to_user
        }, {
            user_id: to_user,
            to_user: user_id
        }]

        if (user_id) {
            try {
                const logChatResult = await Chat.find({
                    $and: [
                        { $or: filterCondition }
                    ]
                })
                return res.status(200).json({
                    code: 200,
                    success: true,
                    msg: '',
                    data: logChatResult
                })
            } catch (error) {
                return res.status(200).json({
                    code: 200,
                    success: false,
                    msg: '',
                    data: []
                })
            }
        }
    },
    /**
     * Update isDelete && message = '' when remove message from list
     * @param {*} data 
     * @returns 
     */
    removeMessageById: async (data: any) => {
        const { _id, token, user_id } = data
        let decoded = jwt.decode(token, { complete: true });
        let filter = {
            _id,
            user_id
        }
        if (_id && user_id) {
            try {
                await Chat.findOneAndUpdate(filter, { message: '', isDelete: true }, {
                    new: true,
                    upsert: true,
                    rawResult: true
                });
                return true
            } catch (error) {
                return false
            }
        }
    },
    postMessageByUser: async (data: any) => {
        const { _id, token, user_id } = data
        let decoded = jwt.decode(token, { complete: true });
        let filter = {
            _id,
            user_id
        }
        if (_id && user_id) {
            try {
                await Chat.findOneAndUpdate(filter, { message: '', isDelete: true }, {
                    new: true,
                    upsert: true,
                    rawResult: true
                });
                return true
            } catch (error) {
                return false
            }
        }
    },
}
