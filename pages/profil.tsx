import { TextInput } from '@mantine/core';
import React from 'react';
import styles from '../styles/Home.module.css'

const profil = () => {
    return (
        <div className={"Profil"}>
        <div className={styles.container}>
            <h1 className={styles.title}>
                Bienvenue sur votre profil
            </h1>
            <br />
        </div>
        <div className={"pseudo"}>Votre pseudo</div>
            <input type="text" name="inputpseudo" />
        
        <div className={"mail"}>Votre mail</div>
        <   input type="text" name="inputmail" />
        
        
        </div>
        
    );
};

export default profil;