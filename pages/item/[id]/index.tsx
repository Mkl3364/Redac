import Header from '../../../components/Header';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { server } from '../../../config';
import { Box, Button } from '@mantine/core'
import Link from 'next/link';
//import { useSelector, useDispatch } from 'react-redux';
//import { setCart } from '../../../state/AppSlice';
import { Notification } from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import { setToStorage } from '../../../helpers/localStorage';

const index = ({ aItem }: any) => {

    //const dispatch = useDispatch()
    const [cartBoolean, setCartBoolean] = useState(false)

    const handleAddCart = () => {
        //dispatch(setCart(aItem))
        setToStorage('panier1', aItem.aItem.map((e: any) => e.nom))
        setCartBoolean(true)
    }

    return (
        <>
            <Header titre='Site e-commerce | Detail' />
            {cartBoolean 
            
            ? 

                <Notification icon={<Check size={18} />} color="teal" title="Notification">
                L'article {aItem.aItem.map((e: any) => e.nom)} a été ajouté au panier
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
                <p>{aItem.aItem.map((desc: any) => desc.description)}</p>
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

export default index;