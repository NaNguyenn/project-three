import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useVocabulary from '../../hooks/useVocabulary';

const LessonScreen = ({ navigation }) => {
    const vocabulary = useVocabulary()
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [isQuizMode, setIsQuizMode] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null)
    const [isAnswerChecked, setIsAnswerChecked] = useState(false)

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

    const currentWord = vocabulary[currentWordIndex];

    return (
        <SafeAreaView className="h-full flex">
            {/* Question */}
            <Text className='text-3xl my-4'>{isQuizMode ? currentWord.quiz : currentWord.eng}</Text>

            {/* Options */}
            <View className='gap-y-4 flex-1'>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleOptionPress(index)}
                        className={`p-6 rounded-lg shadow ${isAnswerChecked
                            ? ((option === vocabulary[currentWordIndex].vie || option === vocabulary[currentWordIndex].eng)
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

            {/* Buttons tray */}
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
                        onPress={() => navigation.navigate('Categories')}
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
