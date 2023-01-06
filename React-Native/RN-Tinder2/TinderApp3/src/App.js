import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import ProfileSwipe from './components/ProfileSwipe';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const profiles = [
  {
    name: 'John Doe',
    age: 27,
    likes: ['Hockey', 'Hiking'],
    pic: 'https://i.picsum.photos/id/875/400/700.jpg?hmac=lRCTTEqKWD92eBmpH4wlQzMAlimbfZlquoOe63Mnk0g',
  },
  {
    name: 'Alexis Texas',
    age: 22,
    likes: ['Parties', 'Bananas'],
    pic: 'https://i.picsum.photos/id/657/400/700.jpg?hmac=4lzNCpLyxL1P5xiJN4wFe9sqVK0DgL5OSuHIcESjIVs',
  },
  {
    name: 'Jane Smith',
    age: 35,
    likes: ['Netflix', 'Wine'],
    pic: 'https://i.picsum.photos/id/47/400/700.jpg?hmac=TQCJf6PQAtKGOEKHlgf3xN-JusmYrre3czFnX3AWf5M',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <GestureHandlerRootView style={{flex: 1}}>
          <View>
            <ProfileSwipe />
          </View>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgb(230, 230,230)',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    borderWidth: 1.8,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
