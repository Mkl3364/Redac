import { NextApiRequest, NextApiResponse } from 'next';
import { server } from '../../../config';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //const body = JSON.parse(req.body);

        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data : {
                            "currency" : "eur",
                            "product_data" : {
                                "name" : req.body.name,
                                "description" : req.body.description,
                                "images" : [],
                            },
                            "unit_amount_decimal" : 1200,
                            
                        },
                        quantity: 1,
                        
                    }
                ],
                success_url: `${server}/sales/success?session_id={CHECKOUT_SESSION_ID}` ,
                cancel_url: `${server}/sales/cancel`,
            });
            res.redirect(303, session.url);
        }
        catch (error: any) {
            res.status(500).json({message: error.message})
        }
}