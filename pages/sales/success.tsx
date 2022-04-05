import React from 'react';
import Header from '../../components/Header';

const success = () => {
    return (
        <div>
            <Header titre='Payment success'/>
            <h1>Success ! Merci pour votre paiement</h1>
        </div>
    );
};

export default success;