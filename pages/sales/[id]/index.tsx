import { Button } from '@mantine/core';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { server } from '../../../config';
import getStripe from '../../../config/getStripe';

const index = ({aItem}: any) => {

        const [product, setProduct] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        setProduct(aItem[0].nom)
        setDesc(aItem[0].description)


    }, [])



    console.log(aItem[0].nom, aItem[0].description, aItem[0].prix)

    //useEffect(() => {
    //    const values = Object.values(aItem).map((e: any) => e[0].description)
    //    console.log('les valeurs', values);
    //    console.log(values.map((e: any) => e[0].nom))
    //}, [])

   // const name =  aItem[0].nom
    const description = aItem[0].description
    const price = aItem[0].prix

    const PushParamsToStripeCheckout = async () => {

        //const price = Number(aItem[0].prix)

        await fetch('/api/checkout_sessions', {
            method: "POST",
            headers: {'Content-type': 'application/json', 'Authorization' : `Bearer pk_test_51KmBobKZq74SdZP81vhKSxJGDhPc2UEv1d2SBCu1IJf3WDkc4ZSJENLjFC04YFIA32bs4MBG6Sd8gkQuGR4XynoT00UHNoA9hn`},
            body : JSON.stringify({
                name: product,
                description : description,
                prix: price,
            })
        })
    }

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
            <h1>Acheter </h1>
            <h2>{aItem[0].nom}</h2>
            <Link
                href={`/sales/`}>
            <Button color='cyan' >Paiement rapide</Button>
            </Link>
            <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type='submit' onClick={PushParamsToStripeCheckout}>
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
      </form>
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
        props: aItem
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