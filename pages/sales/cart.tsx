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

    }, [panier])

    //if(panier === null) {
    //    return "Il n'y a rien dans le panier";
    //}

    const handleDeleteFromStorage = () => {
        deleteFromStorage('panier1')
        panier.splice(0, panier.length);
        window.location.reload()
    }

    const RedirectToPayment = () => {
        router.push('/payment')
    }

    return (
        
        <div>
        {   loader && panier[0] !== null ?

            <>
            <h1>Votre panier</h1>

            {panier[0].map((element: any) => {
                return (
                    <>
                    <p>Nom : {element.nom}</p>
                    <p>Quantitié : {element.quantity}</p>
                    </>
                )
            })}
            
            <Button color='cyan' onClick={RedirectToPayment}>Acheter</Button>
            <Button color='cyan' onClick={handleDeleteFromStorage}>Retirer du panier</Button>
            </>
        

            :

            <h2>Il n'y a rien dans le panier</h2>
        }
        </div>
    );
};

export default cart;