import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { db } from '../config/firebaseConfig'

// Initialize an empty context object
const VocabularyContext = createContext({})

// A provider to wrap the app and provide authentication context
export const VocabularyProvider = ({ children }) => {
    const [vocabulary, setVocabulary] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "vocabulary"))
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setVocabulary(data)
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <VocabularyContext.Provider
            value={vocabulary} //vocabulary data
        >
            {children}
        </VocabularyContext.Provider>
    )
}

// Custom hook to access the vocabulary context
const useVocabulary = () => {
    return useContext(VocabularyContext)
}
export default useVocabulary