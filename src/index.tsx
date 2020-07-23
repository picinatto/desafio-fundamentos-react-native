import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => (
  <View style={{ backgroundColor: '#312e38', flex: 1 }}>
    <AppContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </AppContainer>
  </View>
);

// Start the JSON server
// yarn json-server server.json -p 3333
// adb reverse tcp:3333 tcp:3333

export default App;
