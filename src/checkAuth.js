var firebase = require("firebase");

export default {
  checkAuth: () => {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let userInfo = {};
          userInfo.uid = user.uid;
          userInfo.displayName = user.displayName;
          resolve(userInfo);
        } else {
          reject(new Error("User is not logined yet."));
        }
      });
    });
  }
};
