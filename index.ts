import express, { type Request, type Response } from "express";
import cors from 'cors';
import request from 'request';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/' , async(req:Request, res:Response) => {
    const {url} = req.query;
    if(!url) {
        res.status(400).json({error:"No url provided"})
        return;
    }
    const data = await new Promise((resolve, reject) => {
        request(url+'', {json:true}, (err,response,body) => {
            if(err){
                reject(err);
                return;
            }
            resolve(body);
        })
    }).catch((err) => {
        res.status(500).json({err});
    })
    res.status(200).json(data);
})

app.post('/' , async(req:Request, res:Response) => {
    const {url} = req.query;
    if(!url) {
        res.status(400).json({error:"No url provided"})
        return;
    }
    const data = await new Promise((resolve, reject) => {
        request(url+'', {json:true, body: req.body, method:'POST'}, (err,response,body) => {
            if(err){
                reject(err);
                return;
            }
            resolve(body);
        })
    }).catch((err) => {
        res.status(500).json({err});
    })
    res.status(200).json(data);
})


app.listen(process.env.PORT || 7000, () => {
    console.log("Server is listening");
})