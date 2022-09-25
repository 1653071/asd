import express from 'express';
import * as chatmessage from "../controller/chat-message"
import * as ChatController from "../controller/chat-message"
import { uploadFiles1 } from '../ultis/upload';
import { middleware, validate } from '../middlewares/check';
import { MimeTypes } from '../config/image';
import { uploadFiles } from '../ultis/upload';
const 	productRouter = express.Router();
/**
 * @openapi
 * /seed:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is  running
 */
productRouter.get('/seed/:playgroundId',[middleware.checkPlaygroundId], (req,res) => {
	MimeTypes.indexOf(req.file.MimeTypes)
	return res.status(200).send("Playground id not existsdasdass")
})

productRouter.post('/seed1',validate('createUser'),uploadFiles1.single('file') , chatmessage.uploadFiles)

productRouter.post('/upload',uploadFiles1.single('file'), ChatController.uploadFiles)

productRouter.get('/getFile', ChatController.getFile)

productRouter.get('/files/:file', ChatController.getFile2)

productRouter.get('/getMessage', ChatController.getAllMessage)

productRouter.get('/files/download/:messageId',[middleware.checkMessageId], ChatController.download)

export default productRouter;
