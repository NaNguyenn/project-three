import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

// Initialize an empty context object
const VocabularyContext = createContext({});

// A provider to wrap the app and provide vocabulary context
export const VocabularyProvider = ({ children }) => {
    const [vocabulary, setVocabulary] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = collection(db, "vocabulary");
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setVocabulary(data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <VocabularyContext.Provider value={vocabulary}>
            {children}
        </VocabularyContext.Provider>
    );
};

// Custom hook to access the vocabulary context
const useVocabulary = (category = null, level = null) => {
    const allVocabulary = useContext(VocabularyContext);

    if (category) {
        return allVocabulary.filter((word) => word.category === category);
    }

    if (level) {
        return allVocabulary.filter((word) => word.level === level);
    }

    return allVocabulary;
};

export default useVocabulary;
