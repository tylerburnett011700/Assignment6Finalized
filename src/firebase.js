import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCXbDW3TifN4ZRdSUERZm6hP1HFz29OXiU",
  authDomain: "todos1-96e3c.firebaseapp.com",
  databaseURL: "https://todos1-96e3c.firebaseio.com",
  projectId: "todos1-96e3c",
  storageBucket: "todos1-96e3c.appspot.com",
  messagingSenderId: "730247125516",
  appId: "1:730247125516:web:02913c9c3d9c0a3d722c29"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();

export const todosRef = databaseRef.child("todos");
