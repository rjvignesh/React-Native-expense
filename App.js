
import { SafeAreaView, StyleSheet,Platform, StatusBar,Text, View } from 'react-native';
import Home from "./src/screen/Home"
export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : null}}>
        <Home/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
