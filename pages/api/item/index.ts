import type { NextApiRequest, NextApiResponse } from 'next'
import Produit from '../../../db/models/Produit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try{
        const result = await Produit.findAll({});
        res.status(200).json({result})
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}