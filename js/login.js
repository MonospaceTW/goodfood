Vue.component('login', {
  template:
    `
    <div class="login" v-bind:class="{ 'hide': loginState, 'show': loginState }">
      <form action="">
        <label for="displayName">Name:</label>
        <input type="text" id="displayName"><br>
        <label for="email">E-mail:</label>
        <input type="text" id="email" v-model="email"><br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password"><br>
        <button type="submit" id="registerSmtBtn" @click.prevent="signup">Signup</button>
        <button type="submit" id="login" @click.prevent="login">Login</button>        
      </form>
    </div>
    `,
  props: ['loginState'],
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMsg = error.message;
        console.log(errorMsg);
      });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User is logined", user)
          user.updateProfile({
            displayName: this.displayName,
          }).then(function () {
            // Update successful.
            console.log('update success');
          }).catch(function (error) {
            // An error happened.
            console.log('error');
          });
          console.log('name：' + user.displayName);

        } else {
          console.log("User is not logined yet.");
        }
      });
    },
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
      // var user = firebase.auth().currentUser;
      // if (user) {
      //   this.$emit('updateLogin');
      //   console.log("User is logined", user)

      // } else {
      //   console.log("User is not logined yet.");

      // }
    }
  }
});