import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteFromStorage, getFromStorage, setToStorage } from '../../helpers/localStorage';

const cart = () => {

    const [panier, setPanier] = useState<any[]>([])
    const [loader, setLoader] = useState<boolean>(false);
    const router = useRouter()

    useEffect(() => {

        const test = JSON.parse(getFromStorage('panier1'))
        console.log("l'objet test ", test)
        panier.push(JSON.parse(getFromStorage('panier1')))

        console.log('le panier', panier)

        setTimeout(() => {
            setLoader(true)
        }, 5000)

    }, [])

    //if(panier === null) {
    //    return "Il n'y a rien dans le panier";
    //}

    const handleDeleteFromStorage = () => {
        deleteFromStorage('panier1')
    }

    const RedirectToPayment = () => {
        router.push('/payment')
    }

    return (
        
        <div>
        {   loader ?

            <>
            <h1>Votre panier</h1>

            <h3>Produit 1</h3>
            <p> Nom : {panier[0][0].nom}</p>
            <p>Description : {panier[0][0].description}</p>
            <p>Quantité : {panier[0][0].quantity}</p>


            <h3>Produit 2</h3>
            <p> Nom : {panier[0][1].nom}</p>
            <p>Description : {panier[0][1].description}</p>
            
            <Button color='cyan' onClick={RedirectToPayment}>Acheter</Button>
            <Button color='cyan' onClick={handleDeleteFromStorage}>Retirer du panier</Button>
            </>
        

            :

            'Loading...'
        }
        </div>
    );
};

export default cart;