import express from 'express';
import * as chatmessage from "../controller/chat-message"
const productRouter = express.Router();
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

productRouter.post('/seed1', chatmessage.uploadFiles)




export default productRouter;
