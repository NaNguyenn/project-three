import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useVocabulary from "../../hooks/useVocabulary";
import useUserScore from "../../hooks/useUserScore";
import useAuth from "../../hooks/useAuth";

const CategoriesScreen = ({ route, navigation }) => {
  const level = route.params.level;
  const userScore = useUserScore();
  const { user } = useAuth();
  const vocabulary = useVocabulary(null, level);
  // Extract unique categories
  const uniqueCategories = [
    ...new Set(vocabulary.map((word) => word.category)),
  ];

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Scrollable categories section */}
      <ScrollView className="h-full gap-y-6">
        {/* Categories row (2 categories on 1 row)  */}
        <View className="flex-row justify-evenly w-full">
          {/* Map unique categories */}
          {uniqueCategories.map((category) => {
            // Filter words based on category
            const categoryWords = vocabulary.filter(
              (word) => word.category === category
            );
            // Get the number of words in the category
            const wordCount = categoryWords.length;

            let userScoreValue = 1;
            if (user) {
              // Find the user's score for the current category
              const userCategoryScore = userScore[0][category];
              // Get the user's score value for the current category
              userScoreValue =
                userCategoryScore !== undefined ? userCategoryScore : 1;
            }

            return (
              <TouchableOpacity
                key={category}
                className="bg-neutral border border-primaryLight rounded-full shadow w-2/5 aspect-square flex justify-center items-center"
                onPress={() => navigation.navigate("Lesson", { category })}
              >
                {/* Score container */}
                {user && (
                  <Text className="text-secondary font-semibold text-lg">
                    {/* User score  */}
                    {userScoreValue}/{wordCount * 2}
                  </Text>
                )}
                {/* Category title  */}
                <Text className="text-primary font-bold text-2xl">
                  {category}
                </Text>
                {/* Category subtitle (number of words) */}
                <Text className="text-secondary font-semibold text-lg">
                  {wordCount} từ
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
