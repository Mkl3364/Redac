import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { name, prix } = JSON.parse(req.body);

    //const data = {
    //    currency : 'eur',
    //    product_data : {
    //        name : name,
    //    },
    //    unit_amount: prix
    //}

    //const header = {
    //    'Content-Type' : 'application/x-www-form-urlencoded',
    //    'Authorization' : `Bearer ${process.env.STRIPE_SECRET_KEY}`
    //}

    try {
        const price = await stripe.prices.create({
            currency : 'eur',
            product_data: {
                name: name,
            },
            unit_amount: prix
        })
        res.status(200).json(price)
    }
    catch (error) {
        console.error(error)
    }
}