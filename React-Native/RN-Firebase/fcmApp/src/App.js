import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import React, { useEffect, useState } from "react";
// import { openDatabase } from "react-native-sqlite-storage";
import { openDatabase } from "expo-sqlite";
// import { ReactNotifications, Store } from "react-notifications-component";

// On IOS you have to request permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    return true;
  }
  return false;
}

//creatin sqlite storage
const db = openDatabase("fcmapp.db");

export function ExecuteSql(db, query, params = []) {
  console.log("ExecuteSql function is called", 2);
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        query,
        params,
        (tx, res) => resolve(res),
        (e) => reject(e)
      );
    });
  });
}

const App = () => {
  const [pushToken, setPushToken] = useState("");
  const [message, setMessage] = useState({});
  const [lastMessage, setLastMessage] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    requestUserPermission().then((msgPermission) => {
      if (msgPermission) {
        messaging()
          .getToken()
          .then((token) => {
            console.log("token aa gya", token);
            setPushToken(token);
          });
      } else {
        Alert("MSG Permission", "Permission not granted!");
      }
    });
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Foreground State Messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
      setMessage(remoteMessage);
      console.log("body .......", remoteMessage.notification.body);
      console.log("title .......", remoteMessage.notification.title);
      // setBody(remoteMessage.body)
      //message.android.body
      // addTask(pushToken);
    });
    // console.log("Unsubscribe kya hai", unsubscribe)

    return unsubscribe;
  }, []);

  console.log("pushtoken is ", pushToken);

  const createTable = async () => {
    ExecuteSql(
      db,
      `CREATE TABLE IF NOT EXISTS todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`
    )
      .then((t) => console.log("created table is ", t))
      .catch((e) => console.log("Error creating table"));
  };

  function addTask() {
    console.log("addTask is called ", pushToken);

    ExecuteSql(db, "INSERT INTO todotable(task, status) VALUES (?,?)", [
      message.notification.body,
      0,
    ])
      .then(async (res) => {
        console.log(res, `Inserted :${res.insertId}`);
        let tableData = await ExecuteSql(
          db,
          `SELECT * FROM todotable WHERE id=${res.insertId}`
        );

        setData(tableData);
        console.log("data inserted", tableData.rows._array.task);
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  }

  function pullDataFromTable() {
    console.log("pullDataFromTable is called ");

    ExecuteSql(db, "SELECT * FROM todotable").then((res) => {
      console.log("pulling the data", res);
      const {
        rows: { _array },
      } = res;
      const arr = [..._array];
      console.log("rows:", arr[arr.length - 1].task);
      setLastMessage(arr[arr.length - 1].task);
      // setTodos(_array);
    });
  }

  const showMessage = () => {
    console.log("Last notification is ", message);
  };
  useEffect(() => {
    // addTask()
  }, [message, setMessage]);

  useEffect(() => {
    createTable();
    pullDataFromTable();
  }, []);
  // let newMessage = JSON.parse(message);
  // console.log(typeof message)
  // console.log("Notification message object is ",message.notification.body );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Firebase Cloud Messaging Tutorial</Text>
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text>Add data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pullDataFromTable}>
        <Text>Pull data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showMessage}>
        <Text>Show last notification message</Text>
      </TouchableOpacity>

      {/* <DataBase /> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
  },
});
