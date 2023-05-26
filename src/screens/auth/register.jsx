import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalButton from '../../components/HorizontalButton'

const RegisterScreen = () => {
    return (
        <SafeAreaView className="flex items-center justify-center h-full">
            <View className='bg-white w-4/5 gap-y-6 p-4'>
                <View>
                    <Text>Email</Text>
                    <TextInput className='bg-neutral p-1 rounded-sm' placeholder='Nhập email' />
                </View>
                <View>
                    <Text>Mật khẩu</Text>
                    <TextInput className='bg-neutral p-1 rounded-sm' placeholder='Nhập mật khẩu' />
                </View>
                <View>
                    <Text>Xác nhận mật khẩu</Text>
                    <TextInput className='bg-neutral p-1 rounded-sm' placeholder='Nhập lại mật khẩu' />
                </View>
                <View className='w-4/5 self-center'>
                    <HorizontalButton color="bg-primary" content="Đăng nhập" />
                </View>
                <Text className='self-center'>Đã có tài khoản? Đăng nhập</Text>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen