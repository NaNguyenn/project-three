import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../../config/firebaseConfig'

const SignUpScreen = ({ navigation }) => {

    // Form State 
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    // Take in user input 
    const onChange = (name, value) => {
        // update from form
        setSignUpForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Error State 
    const [userError, setError] = useState('')

    // Sign Up Logic 
    const handleSignUp = (e) => {

        // Prevent default submit 
        e.preventDefault()

        // Reset error
        if (e) setError('')

        // Validate email
        const validateEmail = (email) => {
            // Basic regex email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        }

        if (!validateEmail(signUpForm.email)) {
            setError("Email không hợp lệ")
            return
        }

        // Check password length 
        else if (signUpForm.password.length < 8) {
            setError('Mật khẩu phải có ít nhất 8 ký tự')
            return
        }
        // Check password match
        else if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('Mật khẩu không trùng khớp')
            return
        }

        // Firebase logic 
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, signUpForm.email, signUpForm.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                navigation.navigate('Home')
            })
            .catch((error) => {
                // Handle firebase sign up error
                setError("Tài khoản đã tồn tại hoặc thông tin đầu vào không hợp lệ")
            })
    }

    return (
        <SafeAreaView className="flex items-center justify-center h-full">
            {/* Sign Up Form  */}
            <View className='bg-white w-4/5 gap-y-6 p-4'>
                <View>
                    <Text>Email</Text>
                    <TextInput
                        className='bg-neutral p-1 rounded-sm'
                        placeholder='Nhập email hợp lệ'
                        value={signUpForm.email}
                        onChangeText={(text) => onChange('email', text)}
                    />
                </View>
                <View>
                    <Text>Mật khẩu</Text>
                    <TextInput
                        className='bg-neutral p-1 rounded-sm'
                        placeholder='Nhập mật khẩu (ít nhất 8 ký tự)'
                        secureTextEntry={true}
                        value={signUpForm.password}
                        onChangeText={(text) => onChange('password', text)}
                    />
                </View>
                <View>
                    <Text>Xác nhận mật khẩu</Text>
                    <TextInput
                        className='bg-neutral p-1 rounded-sm'
                        placeholder='Nhập lại mật khẩu'
                        secureTextEntry={true}
                        value={signUpForm.confirmPassword}
                        onChangeText={(text) => onChange('confirmPassword', text)}
                    />
                </View>

                {/* Submit Button  */}
                <View className='w-4/5 self-center'>
                    <TouchableOpacity onPress={handleSignUp} className='bg-primary py-6 rounded-lg shadow'>
                        <Text className="text-neutral text-center font-bold text-2xl">
                            Đăng Ký
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Display error if exist */}
                {(userError) && (
                    <Text className='text-red-500 text-sm self-center'>
                        {userError}
                    </Text>
                )}

                <Text className='self-center'>
                    Đã có tài khoản? <Text
                        className='text-primary'
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        Đăng nhập
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen