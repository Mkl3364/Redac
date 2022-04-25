import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setUser } from "../state/AppSlice";


function Profil() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user!.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserName();
  }, [user, loading]);

  const handleLogOut = () => {
      () => logout;
      dispatch(setUser(false))
      router.push('/')
  }

  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <Button onClick={handleLogOut} color='cyan'>Se déconnecter</Button>  
       </div>
     </div>
  );
}

export default Profil;