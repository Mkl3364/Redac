import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../config/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mantine/core";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
    setPassword( e.currentTarget.value);
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const register = () => {
    if(!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  }

  useEffect(() => {
    if(loading) return;
    if(user) router.push('/profil')
  }, [user, loading])

    return (
      <div className="App">
        <form className="form">
        
        <h3>Nom complet</h3>
        <input type="text" placeholder="Nom" onChange={handleNameInput} />

        <h3>Nom d'utilisateur</h3>
        <input type="text" placeholder="Pseudo" onChange={handleEmailInput} />

        <h3>Mot de passe</h3>
        <input type="text" placeholder="Mot de passe" onChange={handlePasswordInput} />

        <br />
        <br />
        <br />

          <Button 
            type="button" 
            color="cyan" 
            className="form__custom-button"
            onClick={register}
          >
            Créer mon compte
          </Button>

          <Button 
            type="button" 
            color="cyan" 
            className="form__custom-button"
            onClick={signInWithGoogle}
          >
            Créer mon compte avec Google
          </Button>

          <div>
            Déjà un compte ? <Link href='/auth/connexion'>Cliquez ici</Link>
          </div>

        </form>
      </div>
    );
}
