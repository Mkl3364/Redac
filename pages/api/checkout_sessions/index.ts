import { NextApiRequest, NextApiResponse } from 'next';
import { config } from 'process';
import Stripe from 'stripe';
import { server } from '../../../config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body.items ?? [],
                success_url: `${server}/sales/success?session_id={CHECKOUT_SESSION_ID}` ,
                cancel_url: `${server}/sales/cancel`,
            });
            res.status(200).json(session);
        }
        catch (error: any) {
            res.status(500).json({message: error.message})
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({message: 'Method not allowed'});
    }
}