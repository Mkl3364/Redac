import { NextApiRequest, NextApiResponse } from "next";
import Produit from "../../../db/models/Produit";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = JSON.parse(req.body)

    if(req.method === 'POST') {

    try {
        const result = await Produit.create({
            nom: body.name,
            description : body.description,
            image: body.image,
            prix: body.prix,
            stock: body.stock
        })
        res.status(200).json({ result })
        
    }
    catch (error) {
        throw new Error("Impossible d'ajouter un article");
    }

}
}