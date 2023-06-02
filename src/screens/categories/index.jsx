import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const CategoriesScreen = ({ navigation }) => {

    return (
        <SafeAreaView className="bg-white h-full">
            {/* Scrollable categories section */}
            <ScrollView className="h-full gap-y-6">
                {/* Categories row (2 categories on 1 row)  */}
                <View className='flex-row justify-evenly w-full'>
                    {/* Category item  */}
                    <TouchableOpacity
                        className='bg-primaryLight border border-neutral rounded-lg shadow w-2/5 aspect-square flex justify-center items-center'
                        onPress={() => navigation.navigate('Lesson')}
                    >
                        {/* Category title  */}
                        <Text className="text-primary font-bold text-2xl">
                            Chào hỏi
                        </Text>
                        {/* Category subtitle  */}
                        <Text className="text-secondary font-semibold text-lg">
                            15 từ
                        </Text>
                    </TouchableOpacity>
                    {/* Category item  */}
                    <TouchableOpacity
                        className='bg-neutral border border-primaryLight rounded-lg shadow w-2/5 aspect-square flex justify-center items-center'
                        onPress={() => navigation.navigate('Lesson')}
                    >
                        {/* Category title  */}
                        <Text className="text-primary font-bold text-2xl">
                            Chào hỏi
                        </Text>
                        {/* Category subtitle  */}
                        <Text className="text-secondary font-semibold text-lg">
                            15 từ
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoriesScreen
