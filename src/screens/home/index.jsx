import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView className="flex-col h-full">
            {/* Main section */}
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center">
                {/* Vocabulary section button */}
                <TouchableOpacity
                    className='bg-primary py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Level')}
                >
                    <Text className="text-neutral text-center font-bold text-2xl">
                        Từ vựng
                    </Text>
                </TouchableOpacity>

                {/* Grammar section button */}
                <TouchableOpacity
                    className='bg-secondary py-6 rounded-lg shadow'
                    onPress={() => navigation.navigate('Developing')}
                >
                    <Text className="text-neutral text-center font-bold text-2xl">
                        Ngữ pháp
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen