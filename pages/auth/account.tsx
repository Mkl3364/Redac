import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';

//TODO
// Récuperer les infos utilisateurs de firebase et les modifier depuis l'app

const account = () => {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [provider, setProvider] = useState('')

    const router = useRouter()

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user!.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
          setEmail(data.email)
          setProvider(data.authProvider)
        } catch (err) {
          console.error(err);
        }
    };

    const providerInfo = () => {
        if(provider === 'google') {
            return 'Connecté avec Google'
        } else {
            return 'Connecté avec votre email'
        }
    }

    const handleUserNameChange = () => {
        
    }

      useEffect(() => {
          if(!user) {
              router.push('/')
          }
        fetchUserName()
      }, [user, loading])


    return (
        <div>
            <h1>Account</h1>

            <h3>Compte : {name}</h3>
            <h3>Email : {email}</h3>
            <h3>{providerInfo()}</h3>

            <Button onClick={handleUserNameChange} color='cyan'>Modifier les informations utilisateurs</Button>

        </div>
    );
};

export default account;