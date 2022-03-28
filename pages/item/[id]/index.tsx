import Header from '../../../components/Header';
import { GetStaticProps } from 'next';
import React from 'react';
import { server } from '../../../config';
import { Box, Button } from '@mantine/core'
import Link from 'next/link';

const index = ({ aItem }: any) => {

    return (
        <>
            <Header titre='Site e-commerce | Detail' />
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
                    <Link href="/sale">
                        <a>Acheter</a>
                    </Link>
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