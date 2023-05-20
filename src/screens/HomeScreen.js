import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import HorizontalButton from '../components/HorizontalButton'

const HomeScreen = () => {

    const navigation = useNavigation()

    // Hide the default header 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center">
            <View>
                <HorizontalButton color="bg-primary" content="Từ vựng" />
            </View>
            <View>
                <HorizontalButton color="bg-secondary" content="Ngữ pháp" />
            </View>
        </View>
    )
}

export default HomeScreen