import { ObjectId } from "mongodb";

const { check, param } = require('express-validator');

let validateRegisterUser = () => {
	return [
		check('title', 'username does not Empty').not().isEmpty(),
		check('title', 'username must be Alphanumeric').isAlphanumeric(),
		check('playgroundId', 'playgroundid not does not Empty').not().isEmpty(),
		check('playgroundId', 'playground id must be number').isNumeric(),
		check('team', 'teamdoes not Empty').not().isEmpty(),
		check('team', 'Invalid must be number').isNumeric(),
		
	];
}

let validate = {
	validateRegisterUser: [
		check('message', 'message does not Empty').not().isEmpty(),
		check("message", 'message must be Alphanumeric').isAlphanumeric(),
		check('fileAttach', 'file attach much be array').isArray().custom((value) => {
			if (_.isArray(value)) {
			  if (value.length !== 0) {
				for (var i = 0; i < value.length; i++) {
				  if (
					/^[ \u0600-\u06FF A-Za-z ][ \u0600-\u06FF A-Za-z ]+$/.test(
					  value[i]
					)
				  ) {
					if (i === value.length - 1) {
					  return true;
					} else {
					  continue;
					}
				  } else {
					throw new Error("Invalid data point");
				  }
				}
			  } else {
				return true;
			  }
			} else {
			  throw new Error("Invalid data point");
			}
		  }),
		check('user.email', 'Invalid does not Empty').not().isEmpty(),
		check('user.email', 'Invalid email').isEmail(),
		check('user.birthday', 'Invalid birthday').isISO8601('yyyy-mm-dd'),
		check('user.password', 'password more than 6 degits').isLength({ min: 6 }),
		check('passwordConfirmation').custom((value, { req }) => {
			if (value !== req.body.password) {
			  throw new Error('Password confirmation does not match password');
			}
		
			// Indicates the success of this synchronous custom validator
			return true;
		  }),
		param('ticketId').customSanitizer(value => {
			return new ObjectId(value);
		  }),
		check('filter').isObject(),
		https://express-validator.github.io/docs/check-api.html
        
	]
};

export default validate
