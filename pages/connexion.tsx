import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mantine/core";

const Pageconnexion = () => {
    return (
        <form className="form">
            <h1>Connexion</h1>
            <input type="text" placeholder="Pseudo" />

            <h1>Mot de passe</h1>
            <input type="password" placeholder="Mot de passe" />

            <br />
            <br />
            <br />

          <Button 
            type="button" 
            color="primary" 
            className="form__custom-button"
            //onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Connexion
          </Button>

          <Button 
            type="button" 
            color="success" 
            className="form__custom-button"
            //onClick={signInWithGoogle}
          >
           Connexion avec Google
          </Button>

          <Button 
            type="button" 
            color="primary" 
            className="form__custom-button" 
            //onClick={handleClickOnRegister}
          >
            Créer un compte
          </Button>

          {/*<div>
            <Link to="/reset">Mot de passe oublié ?</Link>
          </div>}*/}

          {/*<div>
            Pas encore de compte ? <Link to="/register">S'enregistrer</Link>
          </div>*/} 
          </form>
    );
};

export default Pageconnexion;

