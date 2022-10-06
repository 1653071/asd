import express from 'express';
import { uploadFiles1 } from '../ultis/upload';
import { middleware, validate } from '../middlewares/check';
import { MimeTypes } from '../config/image';
import { uploadFiles, upload1 } from '../ultis/upload';
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

productRouter.post('/uploadfile', upload1.single('myFile'), (req: any, res, next) => {
	const file = req.file
	if (!file) {
	  const error = new Error('Please upload a file')
	  return next(error)
	}
	res.send(file)
  })

export default productRouter;
