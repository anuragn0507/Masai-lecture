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
console.log('screen height is ', SCREEN_HEIGHT);

const ProfileSwipe = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const prevX = useSharedValue({x: 0});
  const prevY = useSharedValue({y: 0});

  const rt = useRef(new Animated.Value(0)).current;

  const profileGesture = Gesture.Pan()
    .onStart(() => {
      // console.log("prevX", prevX );
      // prevX.value.x = translateX.value;
      // prevY.value.y = translateY.value;
      prevX.value = {x: translateX.value};
      prevY.value = {y: translateY.value};
      // console.log('Previous value ', prevX.value, prevY.value);
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
    })
    .onEnd(() => {
      console.log('translatey ', translateY, '---', SCREEN_HEIGHT);
      console.log('translateX ', translateX, '---', SCREEN_WIDTH);
      if (
        translateY.value > -SCREEN_HEIGHT / 2 &&
        translateX.value < SCREEN_WIDTH / 2
      ) {
        translateY.value = withSpring(0, {damping: 50});
        translateX.value = withSpring(0, {damping: 50});
      } else if (translateY.value > -SCREEN_HEIGHT / 3) {
        translateY.value = withSpring(0, {damping: 50});
      } else {
        translateY.value = withSpring(0, {damping: 50});
        translateX.value = withSpring(0, {damping: 50});
      }
    });

  useEffect(() => {
    translateY.value = withSpring(0, {damping: 50});
  }, []);

  const swipeAnimStyle = useAnimatedStyle(() => {
    // console.log('x', translateX, 'y', translateY);
    // console.log('animation style is called');
    return {
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
        {
          rotate: `${interpolate(
            translateX.value,
            [-100, 0, 100],
            [-8, 0, 8],
          )}deg`,
        },
      ],
    };
  });

  const swipeRightAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, SCREEN_WIDTH / 5, 100],
        [0, 0.5, 1],
      ),
    };
  });

  const swiptLeftAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [-SCREEN_WIDTH / 3, 0], [1, 0]),
    };
  });

  const swipeUpAnim = useAnimatedStyle(() => {
    if (Math.abs(translateX.value) <= SCREEN_WIDTH / 4) {
      return {
        opacity: interpolate(
          translateY.value,
          [-SCREEN_HEIGHT, -SCREEN_HEIGHT / 3, 0],
          [1, 0.7, 0],
        ),
      };
    } else {
      return {opacity: 0};
    }
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
          {
            <View style={{position: 'absolute', right: 80, top: 400}}>
              <Animated.Text
                style={[
                  {
                    color: 'green',
                    fontSize: 40,
                    borderWidth: 3,
                    borderColor: 'green',
                    borderRadius: 6,
                    fontWeight: 'bold',
                    padding: 10,
                    transform: [{rotate: '20deg'}],
                  },
                  swipeRightAnim,
                ]}>
                Like
              </Animated.Text>
            </View>
          }
          {
            <View style={{position: 'absolute', left: 80, top: 400}}>
              <Animated.Text
                style={[
                  {
                    color: 'red',
                    fontSize: 40,
                    borderWidth: 3,
                    borderColor: 'red',
                    borderRadius: 6,
                    fontWeight: 'bold',
                    padding: 10,
                    transform: [{rotate: '-20deg'}],
                  },
                  swiptLeftAnim,
                ]}>
                Nope
              </Animated.Text>
            </View>
          }
          {
            <View style={{position: 'absolute', bottom: 200, left: 40}}>
              <Animated.Text
                style={[
                  {
                    color: '#16beed',
                    fontSize: 40,
                    borderWidth: 3,
                    borderColor: '#16beed',
                    borderRadius: 6,
                    fontWeight: 'bold',
                    padding: 10,
                    transform: [{rotate: '-20deg'}],
                  },
                  swipeUpAnim,
                ]}>
                Super Like
              </Animated.Text>
            </View>
          }
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
  },
  profileCard: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#FFF',
    borderWidth: 2,
    marginVertical: 5,
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
