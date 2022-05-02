import { NextApiRequest, NextApiResponse } from "next";
import Produit from "../../../db/models/Produit";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = JSON.parse(req.body);

    try {
        const deletedItem = await Produit.destroy({
            where: {
                id_produit: body.id,
            }
        })
        res.status(200).json({ deletedItem })

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}