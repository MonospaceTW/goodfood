<template>
  <footer>
    <div class="home">
      <router-link 
      :to="{
        path: '/home'
      }"
      >
        <img src="../assets/images/icon-home.svg" alt="">
      </router-link>
    </div>
    <div class="member">
      <router-link
      :to="{
        path: '/member'
      }"
      >
        <img src="../assets/images/icon-member.svg" alt="">
      </router-link>
    </div>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  height: 47px;
  align-items: flex-end;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}
footer a {
  display: block;
  width: 100%;
  height: 47px;
}
.home {
  flex: 1;
  display: flex;
  height: 47px;
  align-items: flex-end;
  justify-content: space-around;
}
.home a {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.home img {
  width: 24px;
  height: 20px;
}

.member {
  flex: 1;
  display: flex;
  height: 47px;
  align-items: flex-end;
  justify-content: space-around;
}
.member a {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.member img {
  width: 18px;
  height: 21px;
}
</style>
