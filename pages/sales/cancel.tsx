import React from 'react';
import Header from '../../components/Header';

const cancel = () => {
    return (
        <div>
            <Header titre='Payment failed'/>
            <h1>Cancel ! Avez-vous oublié d'ajouter un produit au panier ?</h1>
        </div>
    );
};

export default cancel;