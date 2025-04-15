import React, { useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([])
    const [foods, setFood] = useState([]);
    // console.log(foods)

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const signUpEmailPass = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInEmailPass = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInPopup = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const githubPupop = () => {
        return signInWithPopup(auth, githubProvider);
    }
    const signout = () => {
        // setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsers(user)
                const userEmail = {email: user.email}; 
                // console.log(user.displayName, user.email, user.photoURL    )
                axios.post(`http://localhost:5000/jwt`, userEmail, {
                    withCredentials: true
                })
                .then(res =>{
                    console.log(res.data)
                })
                .catch(er =>{
                    console.log(er)
                })
            } else {
                setUsers(null)
                axios.post(`http://localhost:5000/logout`, {}, {
                    withCredentials: true
                })
                .then(res =>{
                    // console.log(res.data)
                })

            }
            console.log(user ? "user captured" : "user not captured")
        });
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        signUpEmailPass,
        signInEmailPass,
        signInPopup,
        githubPupop,
        setLoading,
        loading,
        signout,
        users,
        setUsers,
        foods,
        setFood,


    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;