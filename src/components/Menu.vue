<script>
var firebase = require("firebase");

export default {
  data() {
    return {
      storeName: {}
    };
  },
  created() {
    firebase
      .database()
      .ref("store")
      .child("-L1LeGds02yWfMcvMwIn")
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      })
      .then(data => {
        this.storeName = data;
        console.log(this.storeName);
      });
  }
};
</script>

<template>
  
</template>
