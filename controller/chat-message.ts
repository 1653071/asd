import { ObjectId } from "mongodb";
import mongo from "mongodb"
import ChatMessage, { ChatMessageSchema } from "../schema/ChatMessage";
import upload from "../ultis/upload"
import a, { db } from "../connect"
const dbConfig = require("../config/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const baseUrl = "http://localhost:4000/files/";
const mongoClient = new MongoClient(url);
const fs = require('fs')
const Grid = require('gridfs-stream')

import mongoose, { Cursor } from "mongoose";
const uploadFiles = async (req: any, res: any) => {
  try {
    console.log(req.file)
    console.log(req.body.playgroundId)
    console.log(req.body.team)
    const id = new ObjectId();
    const a = await upload.uploadFilesMiddleware(req, res);
    console.log("ccc", a)
    if (req.file == undefined) {
      return res.send({
        filename: "You must select a file.",
      });
    }

    return res.send({
      filename: req.file.filename,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};
export interface UserDoc {
  _id: ObjectId
  deletedDate?: Date;
  content?: string;
  playgroundId?: number;
  team?: number;
  type?: number;
  linkImage?: string
}
const getAllMessage = async (req, res) => {
  await ChatMessage.find().then((result: any): any => {
    let a = []
    let b = []
    a = result

    let authors = result.map(async function (author) {
      let c: UserDoc = {
        _id: author._id,
        deletedDate: author.deletedDate,
        content: author.content,
        playgroundId: author.playgroundId,
        team: author.team,
        type: author.type
      }
      if (author.type === 1) {
        const y = await get1File(author.content)
        console.log(y)
        c.linkImage = y.url
        console.log(c)
      }

      b.push(author)
      return author;
    });




    return res.status(200).send(b)
  }).catch(e => {
    return res.status(200).send(e.message)
  })
}

const get1File = async function (name: string): Promise<any> {

  const images = db.collection(dbConfig.imgBucket + ".files");
  return images.findOne({ filename: name }).then(cursor => {
    console.log(cursor)
    return {
      name: cursor.filename,
      url: baseUrl + cursor.filename,
    }
  }).catch(e => {
    return null
  });
}

const download = async (req, res) => {
  try {
    let num = 0;
    const bucket = new GridFSBucket(db, {
      bucketName: dbConfig.imgBucket,
    });
    
    var downloadFolder = process.env.USERPROFILE + "/Downloads/"
    let fullPath = downloadFolder + `` + req.params.messageId

    fullPath = `${downloadFolder}${req.params.messageId} (${num++})`;
    console.log(fullPath)
    console.log(fullPath)
    // while (fs.existsSync(downloadFolder + `/` + req.params.messageId)) {
    //   fullPath = `${downloadFolder}${req.params.messageId} (${num++})`;
    //   console.log(fullPath)
    // }
    console.log(downloadFolder + `/` + req.params.messageId)
    console.log(fs.existsSync(downloadFolder + `/` + req.params.messageId))
    let downloadStream = bucket.openDownloadStreamByName(req.params.messageId).pipe(fs.createWriteStream(fullPath))
      .on('error', (e) => {
        console.log("Some error occurred in download:");
        res.send(e);
      })
      .on('finish', () => {
        console.log("done downloading");
        res.send('Done Downloading');
      });
  }
  catch (e) {

  }
};
const getFile = async (req, res) => {

  const images = db.collection(dbConfig.imgBucket + ".files");
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
}

const getFile2 = async (filename: string, res: any) => {

  upload.gfs.collection('photos').findOne({ filename: "1663102435324-bezkoder-1646141362985.jpg" }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(200).send("asd");
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser

      const { db } = mongoose.connection;

      const gridfsBucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'photos'
      })

      const readstream = gridfsBucket.openDownloadStreamByName(file.filename);
      readstream.pipe(res)
    } else {
      return res.status(200).send("asd")
    }
  });
}
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

    const result12 = await ChatMessage.updateOne({ _id: new ObjectId("631e8150d18d1fe8ea974d3a") }, { $set: { deletedDate: d } })

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
export { uploadFiles, deleteMessage, deleteMessag1e, getFile, getAllMessage, getFile2, download }
