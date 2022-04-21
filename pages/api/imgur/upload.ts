import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BaseUrl, data, uploadImage } from "../../../base/BaseApi";

//var FormData = require('form-data')
//var dataToSend = new FormData()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    
    //taToSend.append('image', body.image);

    const body = JSON.parse(req.body)

    

    //const client = new ImgurClient({clientId: process.env.IMGUR_CLIENT_ID})

    try {
        const bod = {
            image: body.image
        }
        //const reponse = await uploadImage(dataToSend);
        //res.status(200).send({reponse})
        //const bod = data('imageUrl', dataToSend);
        const response = await axios.post('https://api.imgur.com/3/image',  bod, { headers: {'Authorization' : 'Client-ID 653f3b8792a5aab' }})
        res.status(200).send(response.data.data['link'])


        //const response = await client.upload({
        //    image: dataToSend
        //})
        //res.send(response.data)

    }

    catch (error) {
        throw error;
    }
}