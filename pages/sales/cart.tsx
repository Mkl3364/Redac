import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import { useSelector } from 'react-redux';
import { deleteFromStorage, getFromStorage } from '../../helpers/localStorage';

const cart = () => {

    //const { cart } = useSelector((store: any) => store.app)
    const [panier, setPanier] = useState<string | null | undefined>('')
    const router = useRouter()

    //console.log(cart.aItem.map((e: any)=>e.nom))

    useEffect(() => {
        const panier = getFromStorage('panier1')
        setPanier(panier)
        console.log(panier)
    }, [])

    const handleDeleteFromStorage = () => {
        deleteFromStorage('panier1')
    }

    const RedirectToPayment = () => {
        router.push('/payment')
    }

    return (
        <div>
            <h1>Votre panier</h1>
            <p>{panier}</p>
            <Button color='cyan' onClick={RedirectToPayment}>Acheter</Button>
            <Button color='cyan' onClick={handleDeleteFromStorage}>Retirer du panier</Button>
        </div>
    );
};

export default cart;