import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

import anurag from "./assets/anurag.jpg";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function App() {
  const br = useRef(new Animated.Value(0)).current;
  const sc = useRef(new Animated.Value(1)).current;
  const rt = useRef(new Animated.Value(0)).current;
  const [isCrossed, setIsCrossed] = useState(false);

  const makeCircle = () => {
    Animated.parallel([
      Animated.spring(rt, { toValue: 5, useNativeDriver: true }),
      Animated.spring(br, { toValue: 50, useNativeDriver: true }),
      // Animated.spring(sc, { toValue: 0.5, useNativeDriver: true }),
    ]).start();

    setIsCircle(true);
  };

  const makeSquare = () => {
    Animated.parallel([
      Animated.spring(rt, { toValue: 0, useNativeDriver: true }),
      Animated.spring(br, { toValue: 0, useNativeDriver: true }),
      // Animated.spring(sc, { toValue: 1, useNativeDriver: true }),
    ]).start();
    setIsCircle(false);
  };

  const fullScreenDesc =()=>{

  }

  const partialScreenDesc = ()=>{

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.drawerContainer}>
        <Image source={anurag} style={styles.profileImage} />
        <Text>Anurag Yadav</Text>
        <Text>View Profile</Text>
        <View>
          <Text>
            {" "}
            <Entypo name="home" size={24} color="white" /> Home
          </Text>
          <Text>
            {" "}
            <Entypo name="user" size={24} color="white" /> About
          </Text>
          <Text>
            {" "}
            <Ionicons name="notifications" size={24} color="white" />{" "}
            Notifications
          </Text>
          <Text>
            {" "}
            <Entypo name="download" size={24} color="white" /> Downloads
          </Text>
        </View>
        <Animated.View style={[styles.description]}>
          <TouchableOpacity 
            onPress={isCrossed ? fullScreenDesc : partialScreenDesc}
            >
              {isCrossed ?<EvilIcons name="navicon" size={24} color="black" />:
              <Entypo name="cross" size={24} color="black" /> }
            
          </TouchableOpacity>


          <Text>Download Content</Text>
          <Text>
            This content is for anything as per your requirement. You can import
            component only for demo purpose.
          </Text>
        </Animated.View>
      </View>
      {/* <Animated.View
        style={[
          styles.square,
          {
            borderRadius: br,
            // scale: sc,
            transform: [
              {
                rotate: rt.interpolate({
                  inputRange: [0, 2, 5],
                  outputRange: ["0deg", "-135deg", "135deg"],
                }),
              },
            ],
          },
        ]}
      ></Animated.View> */}

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? 24 : 0,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  drawerContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#A4BFEF",
    padding: 8,

  },
  description: {
    position: "absolute",
    height: "90%",
    width: "40%",
    backgroundColor: "white",
    left: 135,
    top:80,
    borderRadius:10,
    padding:10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginTop: 25,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  btn: {
    marginTop: 20,
    backgroundColor: "blue",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnText: {
    color: "#fff",
  },
});
