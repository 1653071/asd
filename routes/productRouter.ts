import express from 'express';

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


export default productRouter;
