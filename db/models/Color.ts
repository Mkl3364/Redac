import { DataTypes } from "@sequelize/core";
import sequelize from "../database";

const Color = sequelize.define('Color', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
    },
    valeur_hexa: {
        type: DataTypes.STRING,
        
    },
},
    {
        timestamps: false,
    }
);

export default Color;