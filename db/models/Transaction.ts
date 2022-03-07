import { DataTypes } from "@sequelize/core";
import sequelize from "../database";

const Transaction = sequelize.define('Transaction', {
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    date_transaction: {
        type: DataTypes.DATE,
    },
    adresse_facturation: {
        type: DataTypes.STRING,
    },
    frais_livraison: {
        type: DataTypes.DECIMAL,
    },
    prix_total: {
        type: DataTypes.DECIMAL,
    },
    ref_client: {
        type: DataTypes.INTEGER,
    },
},
    {
        timestamps: false,
    }
);

export default Transaction;