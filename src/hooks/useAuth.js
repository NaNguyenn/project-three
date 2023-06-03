import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'

// Initialize an empty context object
const AuthContext = createContext({})

// A provider to wrap the app and provide authentication context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setUser(user)
        } else {
            // User is signed out
            setUser(null)
        }
    }), [])

    return (
        <AuthContext.Provider
            value={{ user }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to access the authentication context
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth
