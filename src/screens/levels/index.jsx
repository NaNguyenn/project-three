import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LevelScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-col h-full">
            {/* Main section */}
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center">
                <TouchableOpacity
                    className='bg-teal-500 py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Categories')}
                >
                    <Text
                        className="text-neutral text-center font-bold text-2xl"
                        onPress={() => navigation.navigate('Categories')}
                    >
                        Cơ bản
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-sky-500 py-6 rounded-lg shadow'>
                    <Text
                        className="text-neutral text-center font-bold text-2xl"
                        onPress={() => navigation.navigate('Categories')}
                    >
                        Trung bình
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='bg-violet-500 py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Categories')}
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