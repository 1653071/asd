import axios from "axios";
import fs from "fs"
const FormData = require('form-data');
async function run() {
   
    const loginFormData = new FormData();
     loginFormData.append("myFile", fs.createReadStream("D:/Tôi đang chia sẻ '1663066551_Hướng dẫn trình bày tài liệu trên word' với bạn.docx"))
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    // Post the form, just make sure to set the 'Content-Type' header
    const res = await axios.post('http://localhost:4000/uploadFile', loginFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    // Prints "yinyang.png"
    console.log(res.data);
  }
  run().then(e=>{}).catch(e=>{})
