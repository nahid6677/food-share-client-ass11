import React, { useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(null)

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
                console.log(user.displayName, user.email, user.photoURL    )
            } else {
                setUsers(null)
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

    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;