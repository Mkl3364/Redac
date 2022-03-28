import { NextApiResponse } from "next"
import Produit from "../../../db/models/Produit"

export default async function handler({query : {id}} : any, res: NextApiResponse) {
    try{
        const aItem = await Produit.findAll({
            where: {
                id_produit: id,
            }
        })
        res.status(200).json({ aItem })
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}