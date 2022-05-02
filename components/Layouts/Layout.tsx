import styles from '../../styles/Home.module.css'
import React, { ReactNode } from 'react';
import Navbar from '../Layouts/Navbar';

interface LayoutProps {
    children : React.ReactNode
}

const Layout = ({children} : LayoutProps) => { 
    return (
        <div>
            <Navbar />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;