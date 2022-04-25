import { NextApiRequest, NextApiResponse } from 'next';
import { server } from '../../../../config';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = JSON.parse(req.body);

        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                //line_items: [
                //    {
                //        price_data : {
                //            currency : "eur",
                //            product_data : {
                //                name : body.name,
                //                description : body.description,
                //                images : [],
                //            },
                //            unit_amount : body.prix
                //            
                //        },
                //        quantity: 1,
                //        
                //    }
                //],
                line_items: [
                    {
                      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                      currency: 'eur',
                      price: body.price,
                      quantity: 1,
                      amount: 12000,
                      name: req.body.name
                    },
                  ],
                  success_url: `${server}/sales/success`,
                  cancel_url: `${server}/cancel`
            });
            //console.log(session)
            res.redirect(303, session.url);
        }
        catch (error: any) {
            res.status(500).json({message: error.message})
        }
}