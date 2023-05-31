import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import useAuth from '../../hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

const ProfileScreen = ({ navigation }) => {
    const { user } = useAuth()

    return (
        <SafeAreaView className="flex h-full">
            {user ? (
                // Screen when user logged in 
                <View className="bg-neutral flex-1 gap-y-6">
                    <Text>{user?.email}</Text>
                    <TouchableOpacity
                        onPress={() => signOut(auth)}
                        className='bg-primary py-6 rounded-lg shadow w-1/2 m-auto'>
                        <Text className="text-neutral text-center font-bold text-2xl">
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
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