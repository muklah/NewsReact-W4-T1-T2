import firebase from "firebase";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC4X6dHh0oI2eR-2Q_XrpNPrdGn83A8M_g",
    authDomain: "fikracamps-d4b4d.firebaseapp.com",
    databaseURL: "https://fikracamps-d4b4d.firebaseio.com",
    projectId: "fikracamps-d4b4d",
    storageBucket: "fikracamps-d4b4d.appspot.com",
    messagingSenderId: "832956564243"
  };
  firebase.initializeApp(config);
  export const database = firebase.database();
  export default firebase;