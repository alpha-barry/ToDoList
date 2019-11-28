/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import ImagePicker from 'react-native-image-picker';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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
  });
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


ImagePicker.launchCamera(options = { noData: true,}, (response)  => {
  // Response data
});

const App: () => React$Node = () => {

  signIn("alpha-oumar@hotmail.fr", "123456").then(function(uid){
    //setTodo("hello world");
    //updateTodo("iKy8ymiEjEwEpm6KN5Y6", "hehehehehe");
    //listenEventToDo();
    console.log("OK");
   });

  return (
    <>
      

 {/*}    <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
          </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
