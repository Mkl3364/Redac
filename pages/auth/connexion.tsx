import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../config/firebase";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/AppSlice";
import Link from "next/link";

const PageConnexion = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter();

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(user) {
      dispatch(setUser(true))
      router.push('/');
    }
  }, [user, loading])

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordInput = (e : ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleClickOnRegister = () => {
    router.push('/auth/register');
  }

    return (
        <form className="form">
            <h1>Connexion</h1>

            <h3>Nom d'utilisateur</h3>
            <input type="text" placeholder="Pseudo" onChange={handleEmailInput} />

            <h3>Mot de passe</h3>
            <input type="password" placeholder="Mot de passe" onChange={handlePasswordInput}/>

            <br />
            <br />
            <br />

          <Button 
            type="button" 
            color="cyan" 
            className="form__custom-button"
            onClick={() => signInWithEmailAndPassword(auth, email, password)}
          >
            Connexion
          </Button>

          <Button 
            type="button" 
            color="cyan" 
            className="form__custom-button"
            onClick={signInWithGoogle}
          >
           Connexion avec Google
          </Button>

          <Button 
            type="button" 
            color="cyan" 
            className="form__custom-button" 
            onClick={handleClickOnRegister}
          >
            Créer un compte
          </Button>

          <div>
            <Link href="/auth/reset">Mot de passe oublié ?</Link>
          </div>

          <div>
            Pas encore de compte ? <Link href="/register">S'enregistrer</Link>
          </div>
          </form>
    );
};

export default PageConnexion;

