import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import useAuth from "./useAuth";

// Initialize an empty context object
const UserScoreContext = createContext({});

// A provider to wrap the app and provide score context
export const UserScoreProvider = ({ children }) => {
  const { user } = useAuth();
  const [userScore, setUserScore] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, "userScores"),
            where("userEmail", "==", user.email)
          );
          unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data().scores);
            setUserScore(data);
          });
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <UserScoreContext.Provider value={userScore}>
      {children}
    </UserScoreContext.Provider>
  );
};

// Custom hook to access the score context
const useUserScore = () => {
  const allUserScores = useContext(UserScoreContext);

  return allUserScores;
};

export default useUserScore;
