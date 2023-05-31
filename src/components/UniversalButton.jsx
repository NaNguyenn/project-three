import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const UniversalButton = ({ color, content }) => {
    return (
        <TouchableOpacity className={`${color} py-6 rounded-lg shadow`}>
            <Text className="text-neutral text-center font-bold text-2xl">
                {content}
            </Text>
        </TouchableOpacity>
    )
}

export default UniversalButton