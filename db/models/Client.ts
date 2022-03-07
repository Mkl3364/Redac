import { DataTypes } from "@sequelize/core";
import sequelize from "../database";

const Client = sequelize.define('Client', {
    id_client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
    },
    prenom: {
        type: DataTypes.STRING,
    },
    adresse: {
        type: DataTypes.STRING,
    },
    mail: {
        type: DataTypes.STRING,
    },
    telephone: {
        type: DataTypes.STRING,
    },
    code_postal: {
        type: DataTypes.INTEGER,
    },
    ville: {
        type: DataTypes.STRING,
    },
    ref_facture: {
        type: DataTypes.INTEGER,
        
    },
},
    {
        timestamps: false,
    }
);

export default Client;