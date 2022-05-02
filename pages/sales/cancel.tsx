import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import Header from '../../components/Header';

const cancel = () => {
    return (
        <div>
            <Header titre='Payment failed'/>
            <h1>Opération annulée</h1>
            <Link href='/'><Button color='cyan' >Revenir à l`&apos;accueil</Button></Link>
        </div>
    );
};

export default cancel;