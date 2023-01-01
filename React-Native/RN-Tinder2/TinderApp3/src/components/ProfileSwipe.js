import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {useSharedValue} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
console.log(SCREEN_HEIGHT);

const ProfileSwipe = () => {
  const translateY = useSharedValue(0);
  const prevPosition = useSharedValue({y: 0});

  const profileGesture = Gesture.Pan().onStart(() => {
    prevPosition.value = {y: translateY.value};
    console.log('Previous value ', prevPosition.value);
  });

  return (
    <GestureDetector gesture={profileGesture}>
      <Animated.View style={[styles.profile]}>
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
  },
  profileCard: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#FFF',
    borderWidth: 2,
    marginVertical: 15,
  },
  profileHeading: {
    fontSize:24,
    color:'red',
    fontWeight:'bold',
  },

  profileImage: {
    width: '100%',
    height: '90%',
  },
});
