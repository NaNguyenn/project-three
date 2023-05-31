import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import app from '../../config/firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const SignInScreen = ({ navigation }) => {

  // Form State 
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: ""
  })

  // Take in user input 
  const onChange = (name, value) => {
    // update from form
    setSignInForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Error State 
  const [userError, setError] = useState('')

  // Sign In Logic 
  const handleSignIn = (e) => {

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

    if (!validateEmail(signInForm.email)) {
      setError("Email không hợp lệ")
      return
    }

    // Check password length 
    else if (signInForm.password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    // Firebase logic 
    const auth = getAuth(app)
    signInWithEmailAndPassword(auth, signInForm.email, signInForm.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        navigation.navigate('Home')
      })
      .catch((error) => {
        // Handle firebase sign in error
        setError("Tài khoản không tồn tại hoặc sai mật khẩu")
      })
  }

  return (
    <SafeAreaView className="flex items-center justify-center h-full">

      {/* Sign In Form  */}
      <View className='bg-white w-4/5 gap-y-6 p-4'>
        <View>
          <Text>Email</Text>
          <TextInput
            className='bg-neutral p-1 rounded-sm'
            placeholder='Nhập email hợp lệ'
            value={signInForm.email}
            onChangeText={(text) => onChange('email', text)}
          />
        </View>
        <View>
          <Text>Mật khẩu</Text>
          <TextInput
            className='bg-neutral p-1 rounded-sm'
            placeholder='Nhập mật khẩu (ít nhất 8 ký tự)'
            secureTextEntry={true}
            value={signInForm.password}
            onChangeText={(text) => onChange('password', text)}
          />
        </View>

        {/* Submit Button  */}
        <View className='w-4/5 self-center'>
          <TouchableOpacity onPress={handleSignIn} className='bg-primary py-6 rounded-lg shadow'>
            <Text className="text-neutral text-center font-bold text-2xl">
              Đăng Nhập
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
          Chưa có tài khoản? <Text
            className='text-primary'
            onPress={() => navigation.navigate('SignUp')}
          >
            Đăng ký
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default SignInScreen