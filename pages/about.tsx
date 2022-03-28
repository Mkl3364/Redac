import React from 'react';
import styles from '../styles/Home.module.css'

const about = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Bienvenue
            </h1>
            <br />
            Nous developpons une application de vente de trotinette electrique à destination de clients.
        </div>
    );
};

export default about;