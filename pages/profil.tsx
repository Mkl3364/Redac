import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setUser } from "../state/AppSlice";
import { server } from "../config";

function Profil() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [orderID, setOrderId] = useState('')
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

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'transactions'), where('user_id', '==', user?.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        console.log(doc.id, "=>", doc.data().order_id)
        setOrderId(doc.data().order_id)
      })
      console.log('le order id', orderID)
      
    }
    catch(err) {
      console.error(err)
    }
  }




  useEffect(() => {
    fetchUserName();
    fetchOrders()
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