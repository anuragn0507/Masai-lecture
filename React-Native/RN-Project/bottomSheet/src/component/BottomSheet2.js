import React, { useEffect } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet2 = () => {
  const translateY = useSharedValue(10);
  const prevPosition = useSharedValue({y:10});

  const gesture = Gesture.Pan()
  .runOnJS(true)
  .onStart(()=>{
    prevPosition.value = { y: translateY.value};
  })
  .onUpdate((event) => {
    translateY.value = Math.max(event.translationY + prevPosition.value.y, -SCREEN_HEIGHT );
  })
  .onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      translateY.value = withSpring(-35, {damping: 50})
    }else if(translateY.value < -SCREEN_HEIGHT/3){
      translateY.value = withSpring(-SCREEN_HEIGHT, {damping: 50})
    }
  })

  useEffect(()=>{
    translateY.value = withSpring(-35, {damping: 50})
  },[])
  const btmSheetAnimStyle = useAnimatedStyle(()=> {
    return {
    transform: [{translateY: translateY.value}],
    borderRadius: interpolate(translateY.value,
      [-SCREEN_HEIGHT,-SCREEN_HEIGHT+50, 0, ],
      [2,25,25])
  }})

  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.btmSheet,btmSheetAnimStyle]}>
        <View style={styles.line}></View>
        <Text>BottomSheet</Text>
        </Animated.View>
    </GestureDetector>
  )
}

export default BottomSheet2;

const styles = StyleSheet.create({
    btmSheet : {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor:"#FFF",
        top: SCREEN_HEIGHT,
        borderRadius: 5,
        marginTop:-40,
    },
    line:{
        width: 150,
        height: 10,
        backgroundColor: 'grey',
        alignSelf:'center',
        marginVertical: 15,
        borderRadius: 2,
    }
})