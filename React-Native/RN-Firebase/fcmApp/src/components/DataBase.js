import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

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

export function createTable() {
  ExecuteSql(
    db,
    `CREATE TABLE IF NOT EXISTS todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`
  )
    .then((t) => console.log("created table is ", t))
    .catch((e) => console.log("Error creating table"));
}

export function pullDataFromTable() {
  console.log("pullDataFromTable is called ");
  ExecuteSql(db, "SELECT * FROM todotable").then((res) => {
    console.log("pulling the data", res);
    const {
      rows: { _array },
    } = res;
    console.log("rows:", res.rows.item);
    // setTodos(_array);
  });
}

export function addTask(pushToken) {
  console.log("addTask is called ");
  ExecuteSql(db, "INSERT INTO todotable (task, status) VALUES (?,?)", [
    pushToken,
    0,
  ])
    .then(async (res) => {
      console.log(res, `Inserted :${res.insertId}`);
      let data = await ExecuteSql(
        db,
        `SELECT * FROM todotable WHERE id=${res.insertId}`
      );
      // setTodos((prev) => [...prev, data.rows.item(0)]);
      // setVal('');
      console.log("data inserted", data);
    })
    .catch((e) => {
      console.log("Error:", e);
    });
  //setTodos(prev => [...prev,{id: Math.random() , task:val, status:0}])
}

const DataBase = () => {
  return (
    <View>
      <Text>Component for creating the sqlite database</Text>
    </View>
  );
};

export default DataBase;
