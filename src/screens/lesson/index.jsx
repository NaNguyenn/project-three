import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LessonScreen = ({ navigation }) => {

    const data = [
        {
            eng: "hello",
            vie: "xin chào",
            quiz: "Nói khi bạn gặp ai đó, hoặc khi bắt đầu nghe điện thoại",
            audio: ""
        },
        {
            eng: "goodbye",
            vie: "tạm biệt",
            quiz: "Nói khi có người chuẩn bị rời đi, hoặc khi kết thúc cuộc điện thoại",
            audio: ""
        },
        {
            eng: "thanks",
            vie: "cám ơn",
            quiz: "Nói khi ai đó giúp đỡ bạn",
            audio: ""
        },
        {
            eng: "sorry",
            vie: "xin lỗi",
            quiz: "Nói khi bạn mắc lỗi",
            audio: ""
        },
        {
            eng: "please",
            vie: "làm ơn",
            quiz: "Nói khi muốn nhờ ai đó việc gì",
            audio: ""
        }
    ]

    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    const generateRandomOptions = () => {
        // Random index for the correct option 
        const correctIndex = Math.floor(Math.random() * 4)
        const options = []
        // Avoid repeating correct answer 
        const usedIndexes = [currentWordIndex]

        for (let i = 0; i < 4; i++) {
            if (i === correctIndex) {
                // Correct option 
                options.push(data[currentWordIndex].vie)
            } else {
                let randomIndex
                do {
                    randomIndex = Math.floor(Math.random() * data.length)
                } while (usedIndexes.includes(randomIndex))
                options.push(data[randomIndex].vie)
                usedIndexes.push(randomIndex)
            }
        }

        return options
    }

    const handleNextQuestion = () => {
        const nextIndex = Math.floor(Math.random() * data.length)
        setCurrentWordIndex(nextIndex)
    }

    const currentWord = data[currentWordIndex]

    return (
        <SafeAreaView className="h-full">
            {/* Question */}
            <Text className='text-3xl'>{currentWord.eng}</Text>

            {/* Options */}
            <View>
                {generateRandomOptions().map((option, index) => (
                    <TouchableOpacity key={index}>
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Generate another random question button */}
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