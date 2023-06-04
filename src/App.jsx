import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './hooks/useAuth.js'
import TabNavigator from './navigators/TabNavigator.jsx'
import { VocabularyProvider } from './hooks/useVocabulary.js'
import { UserScoreProvider } from './hooks/useUserScore.js'

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
  )
}