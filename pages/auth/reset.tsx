import { Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendPasswordResetEmail } from '../../config/firebase';

const Reset = () => {

    const [email, setEmail] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if(loading) return;
        if(user) router.push('/');
    }, [user, loading])

    return (
        <div className="reset">
      <div className="reset__container">
        <h3>Adresse e-mail</h3>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />

        <br />
        <br />
        
        <Button
          color="cyan"
          onClick={() => sendPasswordResetEmail(auth, email)}
        >
          Send password reset email
        </Button>
        <div>
          Don`&apos;t have an account? <Link href="/auth/register">Register</Link> now.
        </div>
      </div>
    </div>
    );
};

export default Reset;