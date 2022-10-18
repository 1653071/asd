import express,{Request} from 'express';
import { uploadFiles1 } from '../ultis/upload';
import { middleware} from '../middlewares/check';
import { MimeTypes } from '../config/image';
import { uploadFiles, upload1 } from '../ultis/upload';
import validate from '../middlewares/validate.middleware';
import { idText, isConstructorDeclaration } from 'typescript';
import { eSort } from '../middlewares/validate.middleware';
var {validationResult} = require('express-validator');
const 	productRouter = express.Router();


productRouter.post('/uploadfile',validate.validateRegisterUser, (req: Request, res:any)  => {
	    
	
console.log(req.body.sort)
console.log(req.body.sort)
let a
	    if(req.body.sort?.sortDateCreate === undefined){
			a = -1
		}
		else {
			a = 1
		}
	    let b = req.body.sort?.sortDateCreate === undefined ? eSort.DES : req.body.sort?.sortDateCreate
        return res.status(200).send(b.toString());
  })

export default productRouter;
