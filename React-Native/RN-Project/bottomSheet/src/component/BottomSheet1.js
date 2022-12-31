import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const BottomSheet1 = () => {
  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      console.log('Started........');
    })
    .onUpdate(event => {
      console.log('X: ', event.translationX, 'Y: ', event.translationY);
    })
    .onEnd(() => {
      console.log('End........');
    });
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.bottomSheet}>
        <Text>BottomSheet</Text>
      </View>
    </GestureDetector>
  );
};

export default BottomSheet1;

const styles = StyleSheet.create({
  bottomSheet: {
    height: 500,
    width: '100%',
    backgroundColor: '#FFF',
  },
});
