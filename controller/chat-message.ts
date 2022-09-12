import { ObjectId } from "mongodb";
import ChatMessage, {ChatMessageSchema} from "../schema/ChatMessage";
import upload from "../ultis/upload"
const dbConfig = require("../config/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const baseUrl = "http://localhost:8080/files/";
const mongoClient = new MongoClient(url);
import { db } from "../connect";
const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};
const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deleteMessage = async (data: any) => {
  try {
    const result1 = await ChatMessage.deleteOne({ _id: new ObjectId(data.messageId) })
    return result1
  } catch (err) {
    return err
  }
  
};
const deleteMessag1e = async (data: any) => {
  try {
    const Collection = db.collection('ChatMessage')
    db.collection('ChatMessage').createIndex({
      expireAt: 1, // 1 for ascending, -1 for descending
    }, {
      expireAfterSeconds: 30, // expire after 24 hours
    })

    
    await Collection.createIndex({
      deletedDate: -1,
    }, {
      expireAfterSeconds: 30,
      partialFilterExpression: { _id: new ObjectId("631e8150d18d1fe8ea974d3a") }
    });
    var d = new Date('2014-01-01 10:11:55');
    d = new Date(d.getTime() + 10000);

    const result12 = await ChatMessage.findByIdAndUpdate("631e8150d18d1fe8ea974d3a",{deletedDate: d} )
    
    //const result1 = ChatMessageSchema.index({expireAt: 1},{expireAfterSeconds: 2, partialFilterExpression: { _id: new ObjectId("631e31b3d18d1fe8ea974d30") }});
    return result12
  } catch (err) {
    return err
  }
  
};
const changeMessage = async (data: any) => {
  try {
    const result1 = await ChatMessage.deleteOne({ _id: new ObjectId(data.messageId) })
    return result1
  } catch (err) {
    return err
  }
  
};
export { uploadFiles, deleteMessage, deleteMessag1e }
