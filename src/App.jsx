import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './hooks/useAuth.js';
import TabNavigator from './navigators/TabNavigator.jsx';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <TabNavigator />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}