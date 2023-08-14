import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useVocabulary from "../../hooks/useVocabulary";
import SelectDropdown from "react-native-select-dropdown";

const AdminScreen = () => {
  const vocabulary = useVocabulary();
  console.log(vocabulary[0]);

  //Extract unique levels from vocabulary and assign a title
  const uniqueLevels = [...new Set(vocabulary.map((word) => word.level))].map(
    (level) => {
      let property;
      switch (level) {
        case 1:
          property = "Beginner";
          break;
        case 2:
          property = "Intermediate";
          break;
        case 3:
          property = "Advanced";
          break;
        case 4:
          property = "IELTS";
          break;
        default:
          property = "";
      }
      return { level, property };
    }
  );

  return (
    <SafeAreaView>
      <Text>Thêm từ vựng</Text>
      <SelectDropdown
        data={uniqueLevels}
        defaultButtonText="Chọn cấp độ"
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.property;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.property;
        }}
      />
    </SafeAreaView>
  );
};

export default AdminScreen;
