import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    try {
        if(!id.startsWith('cs_')) {
            throw new Error('Incorrect CheckoutSession ID');
        }
        const checkout_session = await stripe.checkout.sessions.retrieve(id);

        res.status(200).json(checkout_session)
    }
    catch (error: any) {
        res.status(500).json({ statusCode: 500, message: error.messaage });
    }
}