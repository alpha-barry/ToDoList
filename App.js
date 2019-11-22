import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase, { firestore } from 'firebase';
import config from './config'

require("firebase/firestore");

// initialise firebase -------------------

 firebase.initializeApp(config);

// Autentification ---------------------------------------------------------------------------------------------------------------------------------------

// créer un compte ---------

function createUser(username, password) {
  const user = firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  }, {me});
  return user.uid;
}

// se connecter -----------

async function signIn(username, password) {
  const user = await firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error");
    // ...
  });
  return user.uid;
}

// se deconnecter ----------

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

// BDD ---------------------------------------------------------------------------------------------------------------------------------------

// ajouter une tache

function setTodo(text) {
  let doc = firebase.firestore().collection("todolist").doc();
  doc.set({
    docId: doc.id,
    uid: firebase.auth().currentUser.uid,
    todo: text,
    validate: false
  }, { merge: true });
}

// modifier une tache

function updateTodo(docId, text) {
  firebase.firestore().collection("todolist").doc(docId).update({
    todo: text,
  });
}

// supprimer une tache

function deleteTodo(docId){
  firebase.firestore().collection("todolist").doc(docId).delete();
}

// ecoute quand un evenement qui se produit dans la BDD

function listenEventToDo() {
  firebase.firestore().collection("todolist").where("uid", "==", firebase.auth().currentUser.uid).onSnapshot(function(docs) {
    docs.docChanges().forEach(function (change) {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
   });
}


export default function App() {

 signIn("alpha-oumar@hotmail.fr", "123456").then(function(uid){
  //setTodo("hello world");
  //updateTodo("iKy8ymiEjEwEpm6KN5Y6", "hehehehehe");
  listenEventToDo();
 });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
