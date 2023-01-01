// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from './components/BottomSheet';
import BottomSheetUI from './components/BottomSheetUI';
import ProfileSwipe from './components/ProfileSwipe';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <BottomSheet /> */}
      {/* <BottomSheetUI /> */}
      <ProfileSwipe />
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});