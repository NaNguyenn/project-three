import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import HorizontalButton from '../components/HorizontalButton'
import Footer from '../components/Footer'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            // Hide the default header
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView className="flex-col h-full">
            {/* Main section */}
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center">
                <View>
                    <HorizontalButton color="bg-primary" content="Từ vựng" />
                </View>
                <View>
                    <HorizontalButton color="bg-secondary" content="Ngữ pháp" />
                </View>
            </View>
            {/* Footer */}
            <Footer />
        </SafeAreaView>
    )
}

export default HomeScreen