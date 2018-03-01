import firebase from "firebase";
// import uuid from "uuid/v4";
import config from "../config";

class FirebaseManagerClass {
  constructor(options) {
    this.options = options;
    firebase.initializeApp(options);
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth = firebase.auth();
  }

  getFirebaselib() {
    return firebase;
  }
  uploadFile(file) {
    const route = `/${file.name}`;
    return this.storage
      .ref(route)
      .put(file)
      .then(snapshot => {
        const result = {
          url: snapshot.downloadURL,
          route
        };
        return result;
      })
      .catch(error => console.log(error));
  }

  signInWithPopup = () => {
    return this.auth.signInWithPopup(this.provider);
  };

  signInWithEmailAndPassword(account, password) {
    return this.auth.signInWithEmailAndPassword(account, password);
  }

  createUserWithEmailAndPassword(account, password) {
    return this.auth.createUserWithEmailAndPassword(account, password);
  }

  signOut = () => {
    return this.auth.signOut();
  };

  sendPasswordResetEmail(emailAddress) {
    return this.auth.sendPasswordResetEmail(emailAddress);
  }

  getValue(route) {
    return this.database
      .ref(route)
      .once("value")
      .then(function(snapshot) {
        return snapshot.val();
      });
  }

  removeChild(route, key) {
    return this.database
      .ref(route)
      .child(key)
      .remove();
  }

  async addNewStore(route, query) {
    const newStoreKey = await this.database
      .ref()
      .child(route)
      .push().key;
    query.StoreKey = newStoreKey;
    const updates = {
      [`/${route}/${newStoreKey}`]: query
    };
    return this.database.ref().update(updates);
  }
  bindAsyncFunc(route, callback) {
    return this.database.ref(route).on("value", callback);
  }

  unbindAsyncFunc(route) {
    return this.database.ref(route).off();
  }

  // createNewCuisine(data) {
  //   return this.database.ref(`cuisine/${uuid()}`).set({
  //     ...data
  //   });
  // }
}

const FirebaseManager = new FirebaseManagerClass(config);

export default FirebaseManager;
