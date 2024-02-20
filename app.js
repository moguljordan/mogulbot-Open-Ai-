import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <WebView source={{ uri: 'https://mogulassistant2-ijgfuuwxia-uc.a.run.app/' }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default App;
