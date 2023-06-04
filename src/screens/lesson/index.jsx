import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useVocabulary from '../../hooks/useVocabulary';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import { db } from '../../config/firebaseConfig';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const LessonScreen = ({ route, navigation }) => {
    const { user } = useAuth()
    const category = route.params.category
    const vocabulary = useVocabulary(category)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [isQuizMode, setIsQuizMode] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null)
    const [isAnswerChecked, setIsAnswerChecked] = useState(false)
    const [sound, setSound] = React.useState()
    const [score, setScore] = useState(0)

    const generateRandomOptions = () => {
        const correctIndex = Math.floor(Math.random() * 4)
        const options = []
        const usedIndexes = [currentWordIndex]

        for (let i = 0; i < 4; i++) {
            if (i === correctIndex) {
                options.push(isQuizMode ? vocabulary[currentWordIndex].eng : vocabulary[currentWordIndex].vie)
            } else {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * vocabulary.length)
                } while (usedIndexes.includes(randomIndex))
                options.push(isQuizMode ? vocabulary[randomIndex].eng : vocabulary[randomIndex].vie)
                usedIndexes.push(randomIndex)
            }
        }

        return options
    };

    useEffect(() => {
        setOptions(generateRandomOptions())
    }, [currentWordIndex, isQuizMode])

    const handlePlayAudio = async (audioSrc) => {
        const { sound } = await Audio.Sound.createAsync({ uri: audioSrc });
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handleOptionPress = (index) => {
        if (!isAnswerChecked) {
            if (selectedOptionIndex === index) {
                setSelectedOptionIndex(null)
            } else {
                setSelectedOptionIndex(index)
            }
        }
    };

    const handleCheckAnswer = () => {
        setIsAnswerChecked(true);
        if (
            (isQuizMode && options[selectedOptionIndex] === vocabulary[currentWordIndex].eng) ||
            (!isQuizMode && options[selectedOptionIndex] === vocabulary[currentWordIndex].vie)
        ) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (isAnswerChecked) {
            const nextIndex = currentWordIndex + 1
            setSelectedOptionIndex(null)
            setIsAnswerChecked(false)

            if (nextIndex >= vocabulary.length) {
                setCurrentWordIndex(0)
                setIsQuizMode(true)
            } else {
                setCurrentWordIndex(nextIndex);
            }
        }
    };

    const handleFinishPress = async () => {
        if (user) {
            try {
                const userScoresRef = collection(db, 'userScores')
                const querySnapshot = await getDocs(
                    query(userScoresRef, where('userEmail', '==', user.email))
                )
                const docRef = querySnapshot.docs[0].ref;
                const docData = querySnapshot.docs[0].data();
                console.log(docData)
                const scores = docData.scores;
                scores[category] = score
                await updateDoc(docRef, { scores })
            } catch (error) {
                console.log('Error updating score:', error);
            }
        }

        navigation.navigate('Home')
    }

    const currentWord = vocabulary[currentWordIndex]

    return (
        <SafeAreaView className="h-full flex">
            {/* Question & score container*/}
            <View className='flex-row items-center mb-4'>
                {/* Question */}
                <Pressable className='flex-row flex-1 items-center gap-x-2' onPress={() => handlePlayAudio(currentWord.audio)}>
                    <Ionicons name="md-volume-medium" size={30} color="black" />
                    <Text className='text-xl'>
                        {isQuizMode ? currentWord.quiz : currentWord.eng}
                    </Text>
                </Pressable>
                {/* Score */}
                <Text className='mx-6 text-xl'>
                    {score}/{vocabulary.length * 2}
                </Text>
            </View>

            {/* Options container */}
            <View className='gap-y-4 flex-1'>
                {/* Map 4 options  */}
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleOptionPress(index)}
                        className={`p-6 rounded-lg shadow ${isAnswerChecked
                            ? ((option === currentWord.vie || option === currentWord.eng)
                                ? 'bg-green-500'
                                : selectedOptionIndex === index
                                    ? 'bg-red-500'
                                    : 'bg-white')
                            : selectedOptionIndex === index
                                ? 'bg-primary'
                                : 'bg-white'
                            }`}
                    >
                        <Text className='text-xl text-black'>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Buttons container */}
            <View className='flex-row'>
                <TouchableOpacity
                    onPress={handleCheckAnswer}
                    className={`flex-1 py-6 shadow ${(selectedOptionIndex === null || isAnswerChecked) ? 'bg-secondaryLight' : 'bg-secondary'}`}
                >
                    <Text className="text-neutral text-center font-bold text-2xl">
                        Check
                    </Text>
                </TouchableOpacity>
                {(isQuizMode && currentWordIndex === vocabulary.length - 1) ?
                    <TouchableOpacity
                        onPress={() => handleFinishPress()}
                        className={`flex-1 py-6 shadow ${isAnswerChecked ? 'bg-primary' : 'bg-primaryLight'}`}
                    >
                        <Text className="text-neutral text-center font-bold text-2xl">
                            Finish
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={handleNextQuestion}
                        className={`flex-1 py-6 shadow ${isAnswerChecked ? 'bg-primary' : 'bg-primaryLight'}`}
                    >
                        <Text className="text-neutral text-center font-bold text-2xl">
                            Next
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

export default LessonScreen
