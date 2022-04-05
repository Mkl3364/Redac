import { Button } from '@mantine/core';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { server } from '../../../config';
import getStripe from '../../../config/getStripe';

const index = ({aItem}: any) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const values = Object.values(aItem).map((e: any) => e[0].description)
        console.log('les valeurs', values);
        console.log(values.map((e: any) => e[0].nom))
    }, [])

    //const redirectToCheckout = async() => {
    //    const {
    //        data: {id},
    //    } = await axios.post('/api/checkout_sessions', {
    //        items: Object.entries(aItem).map(([_, {id, quantity}]) => ({
    //            price: id,
    //            quantity
    //        }))
    //    });
    //    const stripe = await getStripe();
    //    await stripe?.redirectToCheckout({sessionId: id})
    //}

    return (
        <div>
            <h1>Acheter {aItem.aItem.map((e: any) => e.nom)}</h1>
            <h2>{aItem.aItem.map((e: any) => e.description)}</h2>
            <Button color='green'>Ajouter au panier</Button>
            <Link
                href={`/sales/${aItem.aItem.map((e: any) => e.id_produit)}/quickSale`}>
            <Button color='cyan' >Paiement rapide</Button>
            </Link>
            <Link
                href={`/api/checkout/checkoutSession`}>
            <Button color='cyan' > Checkout</Button>
            </Link>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params;
    //console.log('ID params ', id)
    if (id === undefined) {
        throw new Error('ID inconnu')
    }
    const res = await fetch(`${server}/api/item/${id.id}`)

    const aItem = await res.json()

    return {
        props: {
            aItem
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/item`)

    const items = await res.json();
    //console.log('item', items)
    const ids = items.result.map((item: any) => item.id_produit)
    console.log(ids)
    const paths = ids.map((id: any) => ({ params: { id: id.toString() } }))

    return {
        paths,
        fallback: false
    }
}

export default index;