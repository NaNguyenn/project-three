import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NameChangerModal({ isVisible, children, onClose }) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      {/* Modal backdrop  */}
      <View className="bg-white/80 flex-1">
        {/* Modal Content  */}
        <View className="h-40 w-80 bg-white border border-neutral rounded-lg shadow-xl p-4 absolute top-1/2 left-1/2 -mt-20 -ml-40">
          {/* Modal header */}
          <View className="flex-row justify-between items-center">
            <Text>Đặt tên hiển thị mới:</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="md-close" size={24} />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
