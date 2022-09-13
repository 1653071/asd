import express from 'express';
import * as chatmessage from "../controller/chat-message"
import * as ChatController from "../controller/chat-message"
import { uploadFiles1 } from '../ultis/upload';
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
productRouter.get('/seed', () => {
	console.log("asd")
})

productRouter.post('/seed1',uploadFiles1.single('file') , chatmessage.uploadFiles)

productRouter.post('/upload',uploadFiles1.single('file'), ChatController.uploadFiles)




export default productRouter;
