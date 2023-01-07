import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

GoogleSignin.configure({
  webClientId:
    "212075677028-ks2j9idv5p7rk10v48k17236tqk8ngok.apps.googleusercontent.com",
});

import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
