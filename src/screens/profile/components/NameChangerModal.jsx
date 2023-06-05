import { Modal, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NameChangerModal({ isVisible, children, onClose }) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View
                className='h-1/4 w-4/5 bg-primaryLight absolute top-1/2'
            >
                {/* Modal header */}
                <View
                    className='flex-row justify-between items-center'
                >
                    <Text>
                        Đặt tên hiển thị mới:
                    </Text>
                    <Pressable onPress={onClose}>
                        <Ionicons name="md-close" size={24} />
                    </Pressable>
                </View>

            </View>
        </Modal>
    );
}