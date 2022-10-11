import express from 'express';
import { uploadFiles1 } from '../ultis/upload';
import { middleware} from '../middlewares/check';
import { MimeTypes } from '../config/image';
import { uploadFiles, upload1 } from '../ultis/upload';
import validate from '../middlewares/validate.middleware';
var {validationResult} = require('express-validator');
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
productRouter.post('/seed',validate.validateRegisterUser, (req,res) => {
	const errors = validationResult(req);
	/// 0 new
	/// 1 inp
	/// 2 done
	/// 3 rejected
	/// 4 renew
     const ticketStatus = 0;
	const changeStatus = 1;
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  if(ticketStatus === 0 && !(changeStatus ===1 ||changeStatus ===3 )){}

  else if (ticketStatus === 1 && !(changeStatus === 2||changeStatus ===3 )) 

  else if (ticketStatus === 2 && !(changeStatus === 4) 

  else if (ticketStatus === 3 && !(changeStatus === 4) 
  else if (ticketStatus === 4 && !(changeStatus === 2||changeStatus ===3)) 

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
