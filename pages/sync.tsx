import React from 'react';
import sequelize from '../db/database';
import Produit from '../db/models/Produit';

const Sync = () => {
    return (
        <div>
            
        </div>
    );
};

export const getStaticProps = async () => {

    sequelize.authenticate().then(
        () => console.log('Connexion OK')
    )
    await Produit.sync({alter: true}).then(
        () => console.log('Produit synchronized')
    )

    return {
        props: {}
    }
}

export default Sync;