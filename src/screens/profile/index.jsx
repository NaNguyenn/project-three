import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuth from "../../hooks/useAuth";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import NameChangerModal from "./components/NameChangerModal";
import { adminEmails } from "../../data/adminEmails";

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  const handleNameChangerPress = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (text) => {
    setNewDisplayName(text);
  };

  const handleNameChange = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error updating display name:", error);
    }
  };

  //Check if user is admin
  const isAdmin = () => {
    if (user && user.email) {
      return adminEmails.includes(user.email);
    }
    return false;
  };

  return (
    <SafeAreaView className="flex h-full">
      {user ? (
        // Screen when user logged in
        <View className="bg-neutral flex-1 gap-y-6">
          {/* Name changer Modal  */}
          <NameChangerModal isVisible={isModalVisible} onClose={onModalClose}>
            {/* Name changer input  */}
            <TextInput
              className="bg-neutral p-3 rounded-lg my-3"
              placeholder="Nhập tên hiển thị mới"
              value={newDisplayName}
              onChangeText={handleInputChange}
            />
            {/* Modal button  */}
            <TouchableOpacity
              className="bg-primary p-2 rounded-full shadow"
              onPress={handleNameChange}
            >
              <Text className="text-neutral text-center">Đổi tên</Text>
            </TouchableOpacity>
          </NameChangerModal>

          {/* Profile content  */}
          <View className="flex-row items-center px-2 gap-x-2">
            <Text className="text-lg">
              Xin chào, {user.displayName ? user.displayName : user.email}
            </Text>
            <TouchableOpacity
              onPress={() => handleNameChangerPress()}
              className="bg-primary p-2 rounded-full shadow"
            >
              <Text className="text-neutral text-center">Đổi tên</Text>
            </TouchableOpacity>
            {/* Display button if user is an admin */}
            {isAdmin() && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Admin")}
                className="bg-primary p-2 rounded-full shadow"
              >
                <Text className="text-neutral text-center">Admin</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => signOut(auth)}
            className="bg-primary py-6 rounded-lg shadow w-1/2 m-auto"
          >
            <Text className="text-neutral text-center font-bold text-2xl">
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Screen when no user
        <View className="bg-neutral flex-1 flex-col gap-y-6 p-6 justify-center items-center">
          <Ionicons name="md-person-circle-outline" size={50} />
          <Text className="text-center">
            Đăng nhập để có thể tùy chỉnh thông tin cá nhân và theo dõi tiến độ
            học tập
          </Text>
          <View className="w-1/2">
            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              className="bg-primary py-6 rounded-lg shadow"
            >
              <Text className="text-neutral text-center font-bold text-2xl">
                Đăng Nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
