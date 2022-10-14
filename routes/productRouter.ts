import express from 'express';
import { uploadFiles1 } from '../ultis/upload';
import { middleware} from '../middlewares/check';
import { MimeTypes } from '../config/image';
import { uploadFiles, upload1 } from '../ultis/upload';
import validate from '../middlewares/validate.middleware';
var {validationResult} = require('express-validator');
const 	productRouter = express.Router();


productRouter.post('/uploadfile', upload1.single('myFile'), (req: any, res, next) => {
	const file = req.file
	if (!file) {
	  const error = new Error('Please upload a file')
	  return next(error)
	}
	res.send(file)
  })

export default productRouter;
