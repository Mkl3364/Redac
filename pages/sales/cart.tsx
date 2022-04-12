import React from 'react';
import { useSelector } from 'react-redux';

const cart = () => {

    const { cart } = useSelector((store: any) => store.app)

    console.log(cart.aItem.map((e: any)=>e.nom))

    return (
        <div>
            <h1>Votre panier</h1>
            <section>
                <div>{cart.aItem.map((e: any)=>e.nom)}</div>
                <div>{cart.aItem.map((e: any)=>e.description)}</div>
                <div>{cart.aItem.map((e: any)=>e.prix)} euros</div>
            </section>
        </div>
    );
};

export default cart;