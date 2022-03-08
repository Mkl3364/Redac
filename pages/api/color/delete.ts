import type { NextApiRequest, NextApiResponse } from 'next'
import Color from '../../../db/models/Color'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const deletedItem = await Color.destroy({
            where: {
                id: 8,
            }
        })
        res.status(200).json({ deletedItem })
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}


