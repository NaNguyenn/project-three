import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'

const DevelopingScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex h-full">
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center items-center">
                <Ionicons name="md-warning-outline" size={50} />
                <Text className="text-center">Tính năng đang phát triển</Text>
                <View className='w-1/2'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        className='bg-primary py-6 rounded-lg shadow'>
                        <Text className="text-neutral text-center font-bold text-2xl">
                            Trang chủ
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DevelopingScreen