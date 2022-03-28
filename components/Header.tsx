import React from 'react';
import Head from 'next/head'

interface HeaderInterface {
    titre: String
}

const Header = (props: HeaderInterface) => {

    const {titre} = props;
    
    return (
        <div>
        <Head>
        <title>{titre}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        </div>
    );
};

export default Header;