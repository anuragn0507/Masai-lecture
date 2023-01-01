import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
console.log(SCREEN_HEIGHT);

const ProfileSwipe = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const prevPosition = useSharedValue({y: 0});
  const prevX = useSharedValue({x: 0});
  const prevY = useSharedValue({y: 0});

  const rt = useRef(new Animated.Value(0)).current;

  const profileGesture = Gesture.Pan()
    .onStart(() => {
      // prevPosition.value = {y: translateY.value};
      prevX.value = {x: translateX.value};
      prevY.value = {y: translateY.value};
      console.log('Previous value ', prevPosition.value);
    })
    .onUpdate(event => {
      translateY.value = Math.max(
        event.translationY + prevY.value.y,
        -SCREEN_HEIGHT,
      );
      translateX.value = Math.max(
        event.translationX + prevX.value.x,
        -SCREEN_WIDTH,
      );
      console.log('prevX', prevX.value.x);
      console.log('transX', translateX.value);
      console.log('screenW', SCREEN_WIDTH);
      console.log('rt%', translateX.value - prevX.value.x);
      
    })
    .onEnd(() => {
      if (
        translateY.value > -SCREEN_HEIGHT / 2 &&
        translateX.value > -SCREEN_WIDTH / 2
      ) {
        // translateY.value = withSpring(-35, {damping: 50});
        // translateX.value = withSpring(-35, {damping: 50});
      } else if (translateY.value > -SCREEN_HEIGHT / 3) {
        // translateY.value = withSpring(-SCREEN_HEIGHT, {damping: 50});
        // translateX.value = withSpring(-SCREEN_WIDTH, {damping: 50});
      }
    });

  useEffect(() => {
    translateY.value = withSpring(-35, {damping: 50});
  }, []);

  const swipeAnimStyle = useAnimatedStyle(() => {
    console.log('x', translateX, 'y', translateY);
    console.log('aniRT', rt);
    return {
      //   transform: [{translateY: translateY.value}],
    //   transform: [
    //     {
    //       rotate: rt.interpolate({
    //         inputRange: [0, SCREEN_WIDTH-20],
    //         output: ['0deg', '100deg'],
    //       }),
    //     },
    //   ],
      //   transform:[
      //     {translateY: translateY.value},
      //     {rotateX: "45deg"},
      //     {rotateY: "45deg"},
      //   ],
      //   transform:[

      //   ]

      //   transform: [{translateX: translateX.value}],
      //   bottom: interpolate(
      //     translateY.value,
      //     [-SCREEN_HEIGHT, -SCREEN_HEIGHT + 50, 0],
      //     [10, 100, 300],
      //   ),
      //   left: interpolate(
      //     translateX.value,
      //     [SCREEN_WIDTH, -SCREEN_WIDTH + 50, 0],
      //     [0, 100, 300],
      //   )
    };
  });

  return (
    <GestureDetector gesture={profileGesture}>
      <Animated.View style={[styles.profile, swipeAnimStyle]}>
        <View style={[styles.profileCard]}>
          <Text style={[styles.profileHeading]}>Tinder Profile</Text>
          <Image
            style={[styles.profileImage]}
            source={{
              uri: 'https://media.istockphoto.com/id/1396307674/photo/woman-using-online-dating-app-on-phone-and-viewing-someones-profile.jpg?b=1&s=170667a&w=0&k=20&c=LsJMHuRkL1e6Bbu-jkp0Lr6G97iXZ6wMp5EVXc6fmWE=',
            }}
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ProfileSwipe;

const styles = StyleSheet.create({
  profile: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#FFF',
    top: SCREEN_HEIGHT - 500,
  },
  profileCard: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#FFF',
    borderWidth: 2,
    marginVertical: 15,
  },
  profileHeading: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
  },

  profileImage: {
    width: '100%',
    height: '90%',
  },
});
