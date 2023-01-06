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
import {PanGestureHandler} from 'react-native-gesture-handler';

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

let index = 0;

export default function ProfileCard2() {
  const [profile, setProfile] = useState(profiles[0]);
  const [nextProfile, setNextProfile] = useState(profiles[1]);

  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const y = new Animated.Value(0);

  const windowHeight = Dimensions.get('window').height;

  const TopOrBottom = y.interpolate({
    inputRange: [0, windowHeight/2 - 1, windowHeight / 2],
    outputRange: [1, 1, -1],
    extrapolate: 'clamp',
  });

  const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
    inputRange: [-500, 500],
    outputRange: [`-30deg`, `30deg`],
    extrapolate: 'clamp',
  });

  const handlePan = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
    
  );

  const handlePanStateChange = ({nativeEvent}) =>{
    const{state, translationX} = nativeEvent
    if(state === 5){
      if(translationX > 185 || translationX < -185){
        setProfile(nextProfile)
        setNextProfile(profiles[++index%3])
      }else{
        reset.start();
      }
    }
  }

  // const reset = Animated.parallel([
  //   Animated.timing(translateX,{
  //     toValue:0,
  //     duration:200,
  //     useNativeDriver:true
  //   }),
  //   Animated.timing(translateY,{
  //     toValue:0,
  //     duration:200,
  //     useNativeDriver:true
  //   }),
  // ])

  //second way of swiping

  const reset = Animated.timing(translateX,{
    toValue:0,
    duration:250,
    useNativeDriver:true
  })

  const swipeRightAnimation = Animated.timing(translateX,{
    toValue: 600,
    duration: 400,
    useNativeDriver:true
  })

  const swipeLeftAnimation = Animated.timing(translateX,{
    toValue: -600,
    duration: 400,
    useNativeDriver:true
  })
  
  const handleSwipe=({nativeEvent}) =>{
    const {state} = nativeEvent
    console.log( state)
    if(state === 5){
      //handle swipe right
      if(nativeEvent.translationX < -225){
        index++
        swipeRightAnimation.start(()=>{
          //add profile to match list
          setProfile(profiles[index%3])
        })
      }
      //handle swipe left
      else if(nativeEvent.translationX > 225){
        index++
        swipeLeftAnimation.start(()=>{
          setProfile(profiles[index%3])
        })
      }
      //handle uncompleted swipe
      else reset.start()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={{uri: nextProfile.pic}}
            style={{height: '80%', width: '100%'}}></Image>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>
              {nextProfile.name}
            </Text>
            <Text>Age: {nextProfile.age}</Text>
            <Text>Likes: {nextProfile.likes.join(', ')}</Text>
          </View>
        </View>

        {/* <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={handleSwipe}>
          <Animated.View
            style={[
              styles.card,
              {transform: [{translateX}]},
            ]}>
            <Text>Tinder App is here</Text>
            <Image
              source={{uri: profile.pic}}
              style={{height: '80%', width: '100%'}}></Image>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                {profile.name}
              </Text>
              <Text>{profile.age}</Text>
              <Text>Likes: {profile.likes.join(', ')}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler> */}
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
