import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './hooks/useAuth.js'
import TabNavigator from './navigators/TabNavigator.jsx'
import { VocabularyProvider } from './hooks/useVocabulary.js'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <VocabularyProvider>
            <TabNavigator />
          </VocabularyProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}