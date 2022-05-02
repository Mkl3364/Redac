import type { NextApiRequest, NextApiResponse } from 'next'
import Color from '../../../db/models/Color'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try{
        const result = await Color.findAll({});
        res.status(200).json({result})
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}