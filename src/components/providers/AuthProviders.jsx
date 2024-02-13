import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

export const UserContext = createContext(null);
export const auth = getAuth(app);
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signinwithpass = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = ()=>{
        return signOut(auth);
    }

    const googleSignin = (provider)=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUserWithEmail = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, currentUser => {
            // console.log('auth state change', currentUser);
            setUser(currentUser);

            //get and set token
            if(currentUser){
                axios.post('http://localhost:5000/jwt', {email: currentUser.email})
                .then(data =>{
                    // console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });

        return () => {
            unsubscibe();
        }
    }, [])


    const authInfo = {
        user,
        setUser,
        loading,
        createUserWithEmail,
        signinwithpass,
        logout,
        googleSignin
    }

    return (
        <UserContext.Provider value={authInfo}>
            {children}
        </UserContext.Provider>
    )
}
