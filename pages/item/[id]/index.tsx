import Header from '../../../components/Header';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { server } from '../../../config';
import { Box, Button } from '@mantine/core'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../../state/AppSlice';
import { Notification } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { setToStorage } from '../../../helpers/localStorage';
import Image from 'next/image';
import MinusIcon from '../../../public/images/signe-moins.png';
import PlusIcon from '../../../public/images/plus.png';
import ImageBackup from '../../../public/images/e-scooter.jpg';
import PaypalButton from '../../../components/PayPal/PaypalButton';

const Index = ({ aItem }: any) => {

    const { cart } = useSelector((store: any) => store.app)
    const dispatch = useDispatch()
    const [cartBoolean, setCartBoolean] = useState(false)
    const [quantity, setQuantity] = useState<number>(0);
    const [orderID, setOrderID] = useState('')

    const handleAddCart = () => {

        let finalObject = Object.assign({...aItem.aItem[0], quantity})
        console.log("final object", finalObject)
        //const entries = Object.keys(finalObject).map(i => finalObject[i])
        //console.log(entries)
        console.log('aItem', aItem.aItem.map((e: any) => e))
        //dispatch(setCart(aItem.aItem.map((e: any) => e)))
        dispatch(setCart(finalObject))
        //console.log('le panie en context', cart)
        setToStorage('panier1', JSON.stringify(cart))
        setCartBoolean(true)
    }

    //console.log("l'object", aItem)

    const handleClickMinus = () => {
        setQuantity(quantity => quantity - 1)

        if(quantity <= 0) {
            setQuantity(0);
        }
    }

    const handleClickPlus = () => {
        setQuantity(quantity => quantity + 1)

        //if(quantity >= Number(aItem.aItem.map((e: any) => e.stock))) {
        //    setQuantity(Number(aItem.aItem.map((e: any) => e.stock)))
        //}
    }

    const handleCreateOrder = async() => {
        const response = await fetch('/api/paypal/createOrder', {
            method: 'POST',
        });
        //console.log(response)
        const dataa = await response.json();
        console.log(dataa)
        //setOrderID(dataa.id)
        return dataa.id
    }

    const handleCapturePayment = async() => {
        const id = await handleCreateOrder()
        console.log(id)
        const response = await fetch(`/api/paypal/capture/${id}`, {
            method: 'POST',
        })
        const data = await response.json()
        console.log(data)
        return data
    }

    return (
        <>
            <Header titre='Site e-commerce | Detail' />
            {cartBoolean 
            
            ? 

                <Notification icon={<Check size={18} />} color="teal" title="Notification">
                L`&apos;article {aItem.aItem.map((e: any) => e.nom)} a été ajouté au panier
                </Notification>
            
            :

            ''

            }
            <div></div>
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    textAlign: 'center',
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    cursor: 'pointer',

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                    },

                    //paddingRight: '60%'
                })}
            >
               <h1>{aItem.aItem.map((e: any) => e.nom)}</h1>
               <Image src={`${aItem.aItem.map((e: any) => e.image)}` || ImageBackup } height={500} width={500}/>
                <p>{aItem.aItem.map((desc: any) => desc.description)}</p>
                <p>{aItem.aItem.map((desc: any) => desc.prix)} euros</p>
                <Image src={MinusIcon} width={50} height={50} onClick={handleClickMinus}></Image>
                {quantity}
                <Image src={PlusIcon} width={50} height={50} onClick={handleClickPlus}></Image>

                <br />
                <br />

                <Button color="cyan">
                    <Link href='/edit'>
                    <a>Editer</a>
                    </Link>
                </Button>
                <Button color="indigo">
                    <Link 
                    href={`/sales/${aItem.aItem.map((e: any) => e.id_produit)}`}>
                        <a>Acheter</a>
                    </Link>
                </Button>

                <Button color="indigo" onClick={handleAddCart}>
                        <a>Ajouter au panier</a>
                </Button>

                <PaypalButton value={aItem.aItem.map((e: any) => e.prix)} name={aItem.aItem.map((e: any) => e.nom)} description={aItem.aItem.map((e: any) => e.description)} />

            </Box>
        </>
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

export default Index;