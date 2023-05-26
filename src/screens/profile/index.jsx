import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Footer from '../../components/Footer'
import HorizontalButton from '../../components/HorizontalButton'
import Ionicons from '@expo/vector-icons/Ionicons'

const ProfileScreen = () => {
    const user = false
    return (
        <SafeAreaView className="flex h-full">
            {/* Main section */}
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center items-center">
                <Ionicons name="md-person-circle-outline" size={50} />
                <Text className="text-center">Đăng nhập để có thể tùy chỉnh thông tin cá nhân và theo dõi tiến độ học tập</Text>
                <View className='w-1/2'>
                    <HorizontalButton color="bg-primary" content="Đăng nhập" />
                </View>
            </View>
            {/* Footer */}
            <Footer />
        </SafeAreaView>
    )
}

export default ProfileScreen