import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import Header from '../../components/Header';

const success = () => {
    return (
        <div>
            <Header titre='Payment success'/>
            <h1>Succès ! Merci pour votre paiement</h1>
            <Link href='/'><Button color='cyan'>Revenir à la page d'accueil</Button></Link>
        </div>
    );
};

export default success;