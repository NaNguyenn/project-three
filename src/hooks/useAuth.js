import React, { createContext, useContext } from 'react'

// Initialize an empty context object
const AuthContext = createContext({})

// A provider to wrap the app and provide authentication context
export const AuthProvider = ({ children }) => {

    return (
        <AuthContext.Provider value={{
            user: null,
        }}>
            {children}
        </AuthContext.Provider >
    )
}

// Custom hook to access the authentication context
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth