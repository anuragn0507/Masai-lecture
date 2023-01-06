import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

export const HEADER_IMAGE_HEIGHT = Dimensions.get('window').width / 3;

export default function Test() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0], [2, 1], { extrapolateRight: Extrapolation.CLAMP });

    return {
      transform: [{ scale: scale }],
    };
  });

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 20,
            left: 0,
            width: 200,
            height: 200,
            backgroundColor: 'blue',
          },
          animatedStyles,
        ]}
      />

      <Animated.ScrollView
        scrollEventThrottle={1}
        style={StyleSheet.absoluteFill}
        onScroll={scrollHandler}></Animated.ScrollView>
    </View>
  );
}