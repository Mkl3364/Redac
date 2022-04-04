import { Button } from '@mantine/core';
import { GetStaticProps } from 'next';
import React from 'react';
import { server } from '../../../config';

const index = ({aItem}: any) => {
    
    return (
        <div>
            <h1>Acheter {aItem.aItem.map((e: any) => e.nom)}</h1>
            <h2>{aItem.aItem.map((e: any) => e.description)}</h2>
            <Button color='green'>Ajouter au panier</Button>
            <Button color='cyan'>Paiement rapide</Button>
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