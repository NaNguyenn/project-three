import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import useVocabulary from "../../hooks/useVocabulary";
import { addDoc, collection } from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  // Get all unique categories
  const vocabulary = useVocabulary();
  const uniqueCategories = [
    ...new Set(vocabulary.map((word) => word.category)),
  ];

  // Form State
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Take in user input
  const onChange = (name, value) => {
    // update from form
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Error State
  const [userError, setError] = useState("");

  // Sign Up Logic
  const handleSignUp = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Reset error
    if (e) setError("");

    // Validate email
    const validateEmail = (email) => {
      // Basic regex email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(signUpForm.email)) {
      setError("Email không hợp lệ");
      return;
    }

    // Check password length
    else if (signUpForm.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }
    // Check password match
    else if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }

    try {
      // Firebase logic
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpForm.email,
        signUpForm.password
      );
      // Signed in
      const user = userCredential.user;

      // Add user to Firestore
      try {
        // Create an object to hold the user scores for each unique category
        const userScores = {};
        uniqueCategories.forEach((category) => {
          userScores[category] = 0; // Initialize the score as 0
        });

        // Add the userScore document with the unique categories and their scores
        const userScoreRef = await addDoc(collection(db, "userScores"), {
          userEmail: user.email,
          scores: userScores,
        });
      } catch (e) {
        console.error("Error adding user score document: ", e);
      }

      // Navigate to profile tab
      navigation.navigate("Profile");
    } catch (error) {
      // Handle firebase sign up error
      setError("Tài khoản đã tồn tại hoặc thông tin đầu vào không hợp lệ");
    }
  };

  return (
    <SafeAreaView className="flex items-center justify-center h-full">
      {/* Sign Up Form  */}
      <View className="bg-white w-4/5 gap-y-6 p-4">
        <View>
          <Text>Email</Text>
          <TextInput
            className="bg-neutral p-3 rounded-sm"
            placeholder="Nhập email hợp lệ"
            value={signUpForm.email}
            onChangeText={(text) => onChange("email", text)}
          />
        </View>
        <View>
          <Text>Mật khẩu</Text>
          <TextInput
            className="bg-neutral p-3 rounded-sm"
            placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
            secureTextEntry={true}
            value={signUpForm.password}
            onChangeText={(text) => onChange("password", text)}
          />
        </View>
        <View>
          <Text>Xác nhận mật khẩu</Text>
          <TextInput
            className="bg-neutral p-3 rounded-sm"
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={true}
            value={signUpForm.confirmPassword}
            onChangeText={(text) => onChange("confirmPassword", text)}
          />
        </View>

        {/* Submit Button  */}
        <View className="w-4/5 self-center">
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-primary py-6 rounded-lg shadow"
          >
            <Text className="text-neutral text-center font-bold text-2xl">
              Đăng Ký
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display error if exist */}
        {userError && (
          <Text className="text-red-500 text-sm self-center">{userError}</Text>
        )}

        <Text className="self-center">
          Đã có tài khoản?{" "}
          <Text
            className="text-primary"
            onPress={() => navigation.navigate("SignIn")}
          >
            Đăng nhập
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
