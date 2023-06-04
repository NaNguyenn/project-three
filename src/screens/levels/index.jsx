import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useVocabulary from '../../hooks/useVocabulary'

const LevelScreen = ({ navigation }) => {
    const vocabulary = useVocabulary()

    return (
        <SafeAreaView className="flex-col h-full">
            {/* Main section */}
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center">
                {/* Level 1 */}
                <TouchableOpacity
                    className='bg-teal-500 py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Categories', { level: 1 })}
                >
                    <Text
                        className="text-neutral text-center font-bold text-2xl"
                    >
                        Cơ bản
                    </Text>
                </TouchableOpacity>

                {/* Level 2 */}
                <TouchableOpacity
                    className='bg-sky-500 py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Categories', { level: 2 })}
                >
                    <Text
                        className="text-neutral text-center font-bold text-2xl"
                    >
                        Trung bình
                    </Text>
                </TouchableOpacity>

                {/* Level 3 */}
                <TouchableOpacity
                    className='bg-violet-500 py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Categories', { level: 3 })}
                >
                    <Text className="text-neutral text-center font-bold text-2xl">
                        Nâng cao
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LevelScreen