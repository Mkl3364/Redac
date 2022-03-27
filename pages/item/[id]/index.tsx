import Header from '../../../components/Header';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { server } from '../../../config';

const index = ({aItem} : any) => {

    return (
        <>
        <Header titre='Site e-commerce | Detail' />
        <div>
            <h1>{aItem.aItem.map((e: any) => e.nom)}</h1>
            <p>{aItem.aItem.map((desc: any) => desc.description)}</p>
        </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params;
    console.log('ID params ',id)
    if(id === undefined) {
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
    console.log('item', items)
    const ids = items.result.map((item: any) => item.id_produit)
    console.log(ids)
    const paths = ids.map((id: any) => ({params: { id: id.toString() } } ))
    
    return {
        paths,
        fallback: false
    }
}

export default index;