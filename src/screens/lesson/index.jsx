import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useVocabulary from '../../hooks/useVocabulary'

const LessonScreen = ({ navigation }) => {
    const vocabulary = useVocabulary();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isQuizMode, setIsQuizMode] = useState(false);

    const generateRandomOptions = () => {
        const correctIndex = Math.floor(Math.random() * 4);
        const options = [];
        const usedIndexes = [currentWordIndex];

        for (let i = 0; i < 4; i++) {
            if (i === correctIndex) {
                options.push(isQuizMode ? vocabulary[currentWordIndex].eng : vocabulary[currentWordIndex].vie);
            } else {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * vocabulary.length);
                } while (usedIndexes.includes(randomIndex));
                options.push(isQuizMode ? vocabulary[randomIndex].eng : vocabulary[randomIndex].vie);
                usedIndexes.push(randomIndex);
            }
        }

        return options;
    };

    const handleNextQuestion = () => {
        const nextIndex = currentWordIndex + 1;
        if (nextIndex >= vocabulary.length) {
            setCurrentWordIndex(0);
            setIsQuizMode(true);
        } else {
            setCurrentWordIndex(nextIndex);
        }
    }

    const currentWord = vocabulary[currentWordIndex]

    return (
        <SafeAreaView className="h-full gap-4">
            {/* Question */}
            <Text className='text-3xl'>{isQuizMode ? currentWord.quiz : currentWord.eng}</Text>

            {/* Options */}
            <View className='gap-2'>
                {generateRandomOptions().map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        className='p-6 rounded-lg shadow'
                    >
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Generate another question button */}
            <TouchableOpacity
                onPress={handleNextQuestion}
                className='bg-primary py-6 rounded-lg shadow'
            >
                <Text className="text-neutral text-center font-bold text-2xl">
                    Next
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LessonScreen
