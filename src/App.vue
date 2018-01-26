<template>
  <div id="app">
    <router-link to="/HelloWorld">HelloWorld</router-link>
    <router-link to="/todo">todo list</router-link>    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss">
// @import "../node_modules/susy/sass/susy";

// $susy: (
//   columns: 12,
//   container: 1140px,
//   gutters: 0.25,
//   global-box-sizing: border-box,
//   debug: (image: show-columns)
// );
// .testing {
//   @include span(12);
// }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
