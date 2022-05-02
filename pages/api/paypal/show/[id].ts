import { NextApiRequest, NextApiResponse } from "next";
import { generateAccessToken } from "../../../../helpers/PayPalCredentials";


export default async function(req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = req.query
        const accessToken = await generateAccessToken();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers : {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${accessToken}`
            }
        })
        console.log('COuouc')
        res.status(200).json(response)
    }
    catch (error) {
        console.error(error)
    }
}