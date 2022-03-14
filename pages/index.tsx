import type { NextPage } from 'next'
import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'


const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Projet vente de trotinette</title>
        <meta name="description" content="trotinette" />
        <link rel="icon" href=" " />
      </Head>

      <main className={styles.main}>
      <div>
        <Navbar/>
      </div>

        <h1 className={styles.title}>
          Page d&apos;acceuil
        </h1>

         <div className={styles.grid}>
          <a className={styles.card}>
            
          </a>
          </div>

         {/* <a href=" " className={styles.card}>
            
          </a>

          <a
            href=" "
            className={styles.card}
          >
            
          </a>

          <a
            href=" "
            className={styles.card}
          >
            
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <Footer/>
      </footer>
    </div>
  )
}

export default Home
