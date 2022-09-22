import {event} from "./emitEvent"
export const chatBattleEvent = function (socket) {
	socket.on("disconnect", async() => {
        // console.log(socket);
        // const statusData = await UserController.updateStatusByUsername(socket.room)
        // socket.emit('status', statusData)
    });
	socket.on('input', function(data) {
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
        ChatController.deleteMessage(data).then(r=>{})

    })
    socket.on('deleteMessage', async (data: any) => {

        let data1 = {
            messageId: data.messageId

        }
        console.log(data1)
        let isDelete = await ChatController.deleteMessage(data1).then(r=>{
            console.log(r)
            const returnData = {
                error: 0,
                error_description:"Success",
                data : {   
                    deleteCount: r.deleteCount,
                    idMessageDelete: data1.messageId
                } 
            }
            socket.emit("deleted", returnData);
        }).catch(e => {
            const returnData = {
                error: 0,
                error_description:"That Bai",
                data : {   
                    
                } 
            }
            socket.emit("deleted", returnData);
        });
        
        

    })

    socket.on('updateMessage', async (data: any) => {
        let name = data.name;
        let message = data.message;

        let data1 = {
            messageId: data.messageId

        }
        // let isDelete = await ChatController.deleteMessage(data1);
        

    })
    socket.on('sendPhoto', async function (data: any ) {
        const file = data
        console.log(data)
        
        // let ext = "";
        // switch (guess) {
        //     case "png": ext = ".png"; break;
        //     case "jpeg": ext = ".jpg"; break;
        //     default: ext = guess; break;
        // }
        // let savedFilename = "/upload/" + ext;
        // fs.writeFile(__dirname + "/public" + savedFilename, getBase64Image(data.base64), 'base64', function (err) {
        //     if (err !== null)
        //         console.log(err);
        //     else
        //         io.to(roomChannel).emit("isSendImage", {
        //             path: savedFilename,
        //         });
        //     console.log("Send photo success!");
        // });

    });
    /** End send message to user */

    /**
     * Delete message chat 
     */
}
