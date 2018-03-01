<template>
<div class="flex-container">
  <div class="flex-item">
   <img src="../imgs/logo.svg" class="home-logo">
   <p class="home-text">SET LUNCH</p>

   <button class="home-btn"><a href="http://google.com">吃飯囉</a></button>
  </div>
</div>

</template>

<script type = "text/javascript" >
export default {};
</script>
<style>
.flex-container {
  display: -webkit-flex;
  display: flex;
  height: 637px;
  background-color: #f7a654;
}

.flex-item {
  margin: auto;
}

.home-text {
  text-align: center;
  color: #b15814;
  font-size: 16px;
}

.home-logo {
  text-align: center;
  height: 200px;
  width: 200px;
}

.home-btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px orange solid;
  border-radius: 20px;
}
</style>
