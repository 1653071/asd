import { ObjectId } from "mongodb";
import ChatMessage from "../schema/ChatMessage";
import upload from "../ultis/upload"
const dbConfig = require("../config/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const baseUrl = "http://localhost:8080/files/";
const mongoClient = new MongoClient(url);
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
const changeMessage = async (data: any) => {
  try {
    const result1 = await ChatMessage.deleteOne({ _id: new ObjectId(data.messageId) })
    return result1
  } catch (err) {
    return err
  }
  
};
export { uploadFiles, deleteMessage }
