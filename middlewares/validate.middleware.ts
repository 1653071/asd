import { ObjectId } from "mongodb";

const { check, param } = require('express-validator');
export enum eSort {
	ASC=0,
	DES=1
}

let validateRegisterUser = () => {
	return [
		check('sort.sortDateCreate', 'sortDateCreate').not().isEmpty().customSanitizer(value=>{
			if (Object.values(eSort).includes(value)) {
				return value
			}

			return eSort.DES
		}),
		
	];
}

let validate = {
	validateRegisterUser: [
		
			check('sort.sortDateCreate', 'sortDateCreate').not().isEmpty().customSanitizer(value=>{
				if (Object.values(eSort).includes(value)) {
					return value
				}
	
				return eSort.DES
			}),
			
        
	]
};

export default validate
