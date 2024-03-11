import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { store, persistor } from '~/store';
import { PersistGate } from 'redux-persist/integration/react';
import Root from '~/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';


const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </PersistGate>
    </StoreProvider>
  );
}


export default App;