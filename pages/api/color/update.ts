import type { NextApiRequest, NextApiResponse } from 'next'
import Color from '../../../db/models/Color'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "UPDATE") {
    try{
        const result = await Color.update({
          nom:"update",
        },
          {
              where: {
                  id: 1
              }
          }
        );
        res.status(200).json({ result })
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}
}