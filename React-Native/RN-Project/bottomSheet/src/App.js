import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet1 from './component/BottomSheet1';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet2 from './component/BottomSheet2';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{color: '#FFF', textAlign: 'center', fontSize: 25}}>
          Gesture Handler App
        </Text>
        {/* <BottomSheet1 /> */}
        <BottomSheet2 />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
  },
});
