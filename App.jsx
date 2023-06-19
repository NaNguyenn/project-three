import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/hooks/useAuth.js";
import TabNavigator from "./src/navigators/TabNavigator.jsx";
import { VocabularyProvider } from "./src/hooks/useVocabulary.js";
import { UserScoreProvider } from "./src/hooks/useUserScore.js";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <VocabularyProvider>
            <UserScoreProvider>
              <TabNavigator />
            </UserScoreProvider>
          </VocabularyProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
