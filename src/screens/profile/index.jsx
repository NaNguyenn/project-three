import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import useAuth from '../../hooks/useAuth'
import UniversalButton from '../../components/UniversalButton'

const ProfileScreen = ({ navigation }) => {
    const { user } = useAuth()

    console.log(user)

    return (
        <SafeAreaView className="flex h-full">
            {user ? (
                // Screen when user logged in 
                <View className="bg-neutral flex-1">
                    <Text>{user}</Text>
                </View>
            ) : (
                // Screen when no user 
                <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center items-center">
                    <Ionicons name="md-person-circle-outline" size={50} />
                    <Text className="text-center">Đăng nhập để có thể tùy chỉnh thông tin cá nhân và theo dõi tiến độ học tập</Text>
                    <View className='w-1/2'>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                            className='bg-primary py-6 rounded-lg shadow'>
                            <Text className="text-neutral text-center font-bold text-2xl">
                                Đăng Nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </SafeAreaView >
    )
}

export default ProfileScreen