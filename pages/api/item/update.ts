import { NextApiRequest, NextApiResponse } from "next";
import Produit from "../../../db/models/Produit";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = JSON.parse(req.body)
    try{
        const result = await Produit.update({
          nom: body.name,
          description: body.description,
          image: body.image,
          prix: body.prix,
          stock: body.stock
        },
          {
              where: {
                  id_produit: body.id
              }
          }
        );
        res.status(200).json({ result })
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}