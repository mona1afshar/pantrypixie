import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Chatbot: React.FC = () => {
  const webViewRef = useRef<WebView>(null);

  const clickChatButton = `
    const button = document.querySelector('.vf-widget-trigger');
    if (button) button.click();
    true;
  `;

  useEffect(() => {
    // Wait a bit for the widget to load, then click
    const timer = setTimeout(() => {
      webViewRef.current?.injectJavaScript(clickChatButton);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={require('../../assets/index.html')}
          javaScriptEnabled={true}
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewContainer: {
    flex: 1,
    marginVertical: 40,
  },
  webview: {
    flex: 1,
  },
});

export default Chatbot;
