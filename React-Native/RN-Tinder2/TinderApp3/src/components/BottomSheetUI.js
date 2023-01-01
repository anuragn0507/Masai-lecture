import React, { useEffect } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet = () => {
  const translateY = useSharedValue(0);
  const prevPosition = useSharedValue({y:0});

  const scrollTo = (number) => {
    'worklet';
    translateY.value = withSpring(number, {damping: 50});
  }
  const gesture = Gesture.Pan()
  .onStart(()=>{
    prevPosition.value = { y: translateY.value};
  })
  .onUpdate((event) => {
    translateY.value = Math.max(event.translationY + prevPosition.value.y, -SCREEN_HEIGHT );
  })
  .onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      //translateY.value = withSpring(-35, {damping: 50})
      scrollTo(-35);
    }else if(translateY.value < -SCREEN_HEIGHT/3){
      //translateY.value = withSpring(-SCREEN_HEIGHT, {damping: 50})
      scrollTo(-SCREEN_HEIGHT);
    }
  })

  useEffect(()=>{
    //translateY.value = withSpring(-35, {damping: 50})
    scrollTo(-35);
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

export default BottomSheet;

const styles = StyleSheet.create({
    btmSheet : {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor:"#FFF",
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line:{
        width: 150,
        height: 2,
        backgroundColor: 'grey',
        alignSelf:'center',
        marginVertical: 15,
        borderRadius: 2
    }
})