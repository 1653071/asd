import { GraphQLServer, PubSub } from "graphql-yoga";
import swaggerJsdoc from "swagger-jsdoc"
import express from 'express';
import swaggerUi from "swagger-ui-express"
import route from "./routes/index";
const pubsub = new PubSub()
const app = express();
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
	apis: ['./routes/*.ts'],
}
const specs = swaggerJsdoc(options);

route(app)

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:${4999}`);
})
