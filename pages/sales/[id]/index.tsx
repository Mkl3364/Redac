import { Button } from '@mantine/core';
import axios from 'axios';
import { setPersistence } from 'firebase/auth';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { server } from '../../../config';
import getStripe from '../../../config/getStripe';

const Index = ({ aItem }: any) => {

  const [product, setProduct] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [price_id, setPrice_id] = useState<string>('')

  useEffect(() => {
    setProduct(aItem[0].nom)
    setDesc(aItem[0].description)
    setPrice(aItem[0].prix)
    setPrice_id(aItem[0].price_id)
  }, [])



  console.log(aItem[0].nom, aItem[0].description, aItem[0].prix, aItem[0].price_id)

  //useEffect(() => {
  //    const values = Object.values(aItem).map((e: any) => e[0].description)
  //    console.log('les valeurs', values);
  //    console.log(values.map((e: any) => e[0].nom))
  //}, [])

  // const name =  aItem[0].nom
  //const description = aItem[0].description
  //const price = aItem[0].prix

  const PushParamsToStripeCheckout = async () => {

    //const price = Number(aItem[0].prix)

    await fetch(`${server}/api/stripe/checkout_session`, {
      method: "POST",
     
      body: JSON.stringify({
        price: price_id,
        name: product,
        total: price
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
        <Button color='cyan'>Paiement rapide</Button>
      </Link>
      <form action="/api/stripe/checkout_session" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
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

export default Index;