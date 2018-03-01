<script>
import Order from "./Order";
// import checkAuth from "@/checkAuth";
export default {
  props: [],
  data() {
    return {
      uid: "",
      displayName: "",
      mark: "",
      user: {},
      thisOrder: [],
      comfirmed: false,
      stores: [
        
      ]
    };
  },
  components: {
   Order
  },
  created() {
    /* 登入驗證 */
    // checkAuth
    //   .checkAuth()
    //   .then(userInfo => {
    //     this.uid = userInfo.uid;
    //     this.displayName = userInfo.displayName;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.$router.push({
    //       name: "login"
    //     });
    //   });
    firebase.database().ref('store').once('value').then(function (snapshot) {
      console.log(snapshot.key);
      stores = snapshot.val();
      console.log(stores);
      // vm.updateStore();
      // snapshot.forEach(function (data) {
      //   console.log(data.val().menuImage);
      // })
    });
  }
}
</script>


<template>

<div class="container">
  <header></header>
  <h1 class="list_title">合作店家</h1>
  <div class="content">
    <ul>
      
      <li v-for="items in stores">
        <a href="#">
          <img src="https://fakeimg.pl/128x90/?text=Food&font=lobster" alt="">
        </a>
        <div class="info_box">
          <div class="store_name">{{items.storeName}}</div>
          <div class="store_type">中式料理</div>
          <div class="open_time">營業時間： 9:00 ~ 21:00</div>
          <div class="store_phone">04 2222-2222</div>   
        </div>
      </li>
    
      <!-- <li class="loading" v-if="loading">Lording...</li> -->
      
    </ul>
  </div>
  <footer></footer>
</div>

</template>

<style lang="scss" scoped>

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/*至此結束Reset*/

header{
  width: 375px;
  height: 20px;
  background: #000;
}
.container{
  width: 375px;
  height: 667px;
  border: 1px solid red;
  margin: 0 auto;
}
.list_title{
  margin-top: 30px;
  font-family: MicrosoftJhengHei;
  font-size: 20px;
  letter-spacing: 2.4px;
  text-align: center;
  color: #f8a654;
  font-weight: 600;
}
ul{
  margin-top: 17px;
//   border: 1px solid blue;
  li{
    // border: 1px solid green;
    margin-bottom: 22px;
    height: 90px;
    width: 375px;
    a{
      width: 128px;
      margin-left: 28px;
      float: left;
    }
    .info_box{
      float: left;
      div{
        margin-left: 18px;
      }
      .store_name{
        font-family: NotoSansCJKtc;
        font-size: 14px;
        letter-spacing: 1px;
        text-align: left;
        color: #000;
        margin-top: 13px;
      }
      .store_type,.open_time,.store_phone{
        font-family: NotoSansCJKtc;
        font-size: 11px;
        letter-spacing: 1px;
        text-align: left;
        color: #333333;
        margin-top: 6px;
      }
    }
  }
}
footer{
  width: 375px;
  height: 47px;
  background: #000;
  position: absolute;
  top: 621px;
}

</style>
