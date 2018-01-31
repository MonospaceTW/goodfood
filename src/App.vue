<template>
  <div id="app">
    <header>
      <h1>合作餐廳</h1>
    </header>
    <div class="content">
      <div class="preview">
        <div class="preview-content">
          <vue-list :list.sync='list' :dispatchData="setData"></vue-list>
        </div>
      </div>
      <!-- <div class="setting">
        <h3>Scroll info</h3>
        <p>Total items: <span>{{list.length}}</span></p>
        <p>Item height: <span>{{data.height}}px</span></p>
        <p>Above items: <span>{{data._above}}</span></p>
        <p>Below items: <span>{{data._below}}</span></p>
        <p>Rows in window: <span>{{data.displayCount + 1}}-{{(data.displayCount + data._rowsInWindow) > list.length ? list.length: (data.displayCount + data._rowsInWindow)}}</span></p>
        <p><span>{{data._rowsInWindow * 4}}</span> items from <span>{{data.from}}</span> to <span>{{data.to}}</span></p>
        <p>Top height: <span>{{data.lineTopHeight}}px</span></p>
        <p>Bottom Height: <span>{{data.lineBottomHeight}}px</span></p>
        <p>Will load more items: <span>{{!data.canLoadmore}}</span></p>
        <br>
        <p>
          <span>You can open the developer tools and observe the changes in the elements.</span>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import vueList from 'components/vue-list';

window.COUNT = 1;

export default {
  name: 'app',
  data() {
    return {
      list: [],
      data: {}
    }
  },
  created() {
    for(var i = 0; i < 20; i++) {
      this.list.push({
        title: '店家 ' + COUNT++
      });
    }
  },
  methods: {
    setData(data) {
      this.data = data;
    }
  },
  components: {
    vueList
  }
}
</script>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Noto Sans TC", MicrosoftJhengHeiRegular, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  header{
    width: 100%;
    padding: 30px 0;
    margin-bottom: 20px;
    .title{
      font-size: 46px;
      line-height: 20px;
      color: #48B884;
    }
    p{
      color: #7F8C8D;
      .button{
        color: #48B884;
      }
    }
  }
  .content{
    display: flex;
    width: 800px;
    height: 650px;
    margin: 0 auto;
    border: 1px solid red;
    &>div{
      flex: 1;
      height: 100%;
    }
    .preview{
      .preview-content{
        width: 375px;
        height: 667px;
        background: #fff;
        overflow-y: scroll;
        margin: 0 auto;
      }
    }
    .setting{
      span{
        color: #48B884;
      }
    }
  }
}
</style>
