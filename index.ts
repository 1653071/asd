
import swaggerJsdoc from "swagger-jsdoc"
import express from 'express';
import * as ioServer from "socket.io"
import cors from 'cors'

const httpApp = express();
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

httpApp.use(cors({origin: true}));
httpApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const httpServer = require('http').createServer(httpApp);


console.log(httpServer)
const io = new ioServer.Server({
    cors: {
      origin: '*',
    }
  });
io.attach(httpServer);


const wsChat= io.of('/ws-livetrainner');
const chatBattle = io.of('/chat-battle');
wsChat.use((_socket: any, next: () => void) => {
    // ensure the user has sufficient rights
    next();
})

chatBattle.on('connection', (socket: any) => {
    console.log(socket)
    const socketId = socket.id;
    // const clientIp = socket.request.connection.remoteAddress;
    // const clientPort = socket.request.connection.remotePort;
    // const clientFull = ${clientIp}:${clientPort}-${socketId};
    console.log("asd1")
    /** Join room with socketId */
    // socket.join(socketId);

    // Log whenever a user connects
    

    socket.on("disconnect", async() => {
        // console.log(socket);
        // const statusData = await UserController.updateStatusByUsername(socket.room)
        // socket.emit('status', statusData)
    });
    socket.on('input', function(data){
        let name = data.name;
        let message = data.message;
        let sendStatus = function(s){
            socket.emit('status', s);
        }
        // Check for name and message
        if(name == '' || message == ''){
            // Send error status
            sendStatus('Please enter a name and message');
        } else {
            // Insert message
            // chat.insert({name: name, message: message}, function(){
            //     client.emit('output', [data]);

            //     // Send status object
            //     sendStatus({
            //         message: 'Message sent',
            //         clear: true
            //     });
            // });
            chatBattle.emit('output', [data]);

            // Send status object
            sendStatus({
                message: 'Message sent',
                clear: true
            });
        }
    });
    socket.on('sendMessageToGroup', async (data: any) => {
        let name = data.name;
        let message = data.message;
       

    })
    /** End send message to user */

    /**
     * Delete message chat 
     */
    
});


httpServer.listen(4000, () => {
    console.log(`Server is running on http://localhost:${4999}`);
})
