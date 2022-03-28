import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
import AppCard from '../components/AppCard';
import { server } from '../config';



const Home: NextPage = ({item} : any) => {

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <h1 className={styles.title}>
          Home
        </h1>

        {
          item.result.map((e: any) => {
           return <AppCard key={e.id} id_produit={e.id_produit} titre={e.nom} description={e.description} badge={'ON SALE'} image='/../public/images/troti-basic.jpeg' />
          })
        }


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

export const getStaticProps = async() => {
  const res = await fetch(`${server}/api/item`)
  const item = await res.json()
  console.log(item)

  return {
      props: {
          item
      }
  }
}

export default Home
