import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useVocabulary from "../../hooks/useVocabulary";
import SelectDropdown from "react-native-select-dropdown";

const AdminScreen = () => {
  const vocabulary = useVocabulary();
  const uniqueLevels = [...new Set(vocabulary.map((word) => word.level))];
  const uniqueCategories = [
    ...new Set(vocabulary.map((word) => word.category)),
  ];

  return (
    <SafeAreaView>
      <Text>Thêm từ vựng</Text>
      <SelectDropdown
        data={uniqueLevels}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </SafeAreaView>
  );
};

export default AdminScreen;
