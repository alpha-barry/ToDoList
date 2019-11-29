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

//import firebase from 'react-native-firebase';

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

/*firebase.messaging().hasPermission()
  .then(enabled => {
    if (enabled) {
      // user has permissions
    } else {
      // user doesn't have permission
    } 
  });*/


const App: () => React$Node = () => {

  this.state = {
    filePath: {},
  };

  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  /*ImagePicker.launchCamera(function (options, response) {
    // Response data

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      let source = response;
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.state.setState({
        filePath: source,
      });
    }
  });*/

  signIn("alpha-oumar@hotmail.fr", "123456").then(function(uid){
    //setTodo("hello world");
    //updateTodo("iKy8ymiEjEwEpm6KN5Y6", "hehehehehe");
    //listenEventToDo();
    console.log("OK");
   });

  return (
              <Text style={{alignItems: 'center'}}>Step One</Text>
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
