const { check } = require('express-validator');

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
		check('fileAttach', 'file attach much be array').isArray(),
		check('user.email', 'Invalid does not Empty').not().isEmpty(),
		check('user.email', 'Invalid email').isEmail(),
		check('user.birthday', 'Invalid birthday').isISO8601('yyyy-mm-dd'),
		check('user.password', 'password more than 6 degits').isLength({ min: 6 })
	]
};

export default validate
