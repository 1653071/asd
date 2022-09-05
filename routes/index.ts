import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import productRouter from "./productRouter";

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Hero API',
			description: 'Example of CRUD API ',
			version: '1.0.0',
		},
	},
	// looks for configuration in specified directories
	apis: ['./*.ts'],
}
const specs = swaggerJsdoc(options);
function route(app) {
	app.use(
		"/",
		swaggerUi.serve,
		swaggerUi.setup(specs)
	);
	app.use('/api/products', productRouter);
}

export default route;
