import { DataTypes } from "@sequelize/core";
import sequelize from "../database";

const Produit = sequelize.define('Produit', {
    id_produit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
    },
    prix: {
        type: DataTypes.DECIMAL,
    },
    description: {
        type: DataTypes.TEXT,
    },
    stock: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    },
    price_id : {
        type: DataTypes.STRING,
    },
    ref_categorie: {
        type: DataTypes.INTEGER,
    },
},
    {
        timestamps: false,
    }
);

//sequelize.sync({alter: true}).then(
//    () => console.log('Sync of Product completed')
//);

export default Produit;