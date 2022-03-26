import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ColorPicker from '../components/ColorPicker'
import { Button } from '@mantine/core';
import AppCard from '../components/AppCard';


const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <h1 className={styles.title}>
          Home
        </h1>

        <AppCard titre='Trottinette (basic)' description='Simple e-scooter' badge={'ON SALE'} />
        <AppCard titre='Trottinette (premium)' description='Premium e-scooter' badge={'OUT OF ORDER'} />

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
        
      </footer>
    </div>
  )
}

export default Home
