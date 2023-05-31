import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UniversalButton from '../../components/UniversalButton'

const HomeScreen = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            // Hide the default header
            // headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView className="flex-col h-full">
            {/* Main section */}
            <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center">
                <View>
                    <UniversalButton color="bg-primary" content="Từ vựng" />
                </View>
                <View>
                    <UniversalButton color="bg-secondary" content="Ngữ pháp" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen