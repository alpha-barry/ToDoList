/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firebase from 'firebase';
//import firebase from 'react-native-firebase';

import config from './config'


//require("firebase/firestore");
//require("firebase/messaging");

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

/*messaging().hasPermission()
  .then(enabled => {
    if (enabled) {
      console.log("OK");
      // user has permissions
    } else {
      console.log("KO");
      // user doesn't have permission
    } 
  });*/

  
 class ToDoListPage extends Component {
   static navigationOptions = {
      title: 'Welcome',
    };
    render() {
     //const {navigate} = this.props.navigation;
      return (
        <Text numberOfLines={5}>
        salut
      </Text> 
           );
    }
  }



class LoginPage extends Component {
  


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
  state = {email: 'alpha-oumar@hotmail.fr',
  mdp: '123456'
  }

render(){
  return (
    <>
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Connection :</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Entrez ici votre addresse e-mail"
          onChangeText={(text) => this.setState({email: text})}
      

          />  

        <TextInput
          style={{height: 40}}
          placeholder="Entrez ici votre mot de passe"
          onChangeText={(text) => this.setState({mdp: text})}
          // autoCompleteType={password}

          />

          <View style={styles.buttonContainer}>
          <Button
            title="Me connecter"
            onPress={() => {
              alert(this.state.email);
              signIn(this.state.email, this.state.mdp).then((uid) => {
                //setTodo("hello world");
                //updateTodo("iKy8ymiEjEwEpm6KN5Y6", "hehehehehe");
                //listenEventToDo();
                console.log("OK");
               this.props.navigation.navigate('ToDoList', {firebase: firebase});
                // navigate('Rechercher')
              });
            }}
            />
        </View>
      </View>    
</>
  );
}
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

const MainNavigator = createStackNavigator({
  Home: {screen: LoginPage},
  ToDoList: {screen: ToDoListPage}
});

const App = createAppContainer(MainNavigator);
export default App;
