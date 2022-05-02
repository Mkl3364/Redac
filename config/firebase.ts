import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore'


const firebaseConfig = {

    apiKey: "AIzaSyCBJjklGiwU48vllmtuUjipNpTFVQ1p0io",
  
    authDomain: "redac-c12cb.firebaseapp.com",
  
    projectId: "redac-c12cb",
  
    storageBucket: "redac-c12cb.appspot.com",
  
    messagingSenderId: "219592306202",
  
    appId: "1:219592306202:web:95c84b86063040d188aba3",
  
    measurementId: "G-EH1669KWPP"
  
};  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  }
  catch (err: any) {
    console.error(err);
    alert(err.message)
  }
}

const logInWithEmailAndPassword = async(email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

const registerWithEmailAndPassword = async(name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  }
  catch (err: any) {
    console.error(err);
    alert(err.message)
  }
}

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  }
  catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

const logout = () => {
  signOut(auth);
}

export {
  auth,
  db,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
}