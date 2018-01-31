<template lang="html">
  <div class="vue-list" @scroll="handleScroll">
    <ul :style="{
      paddingTop: lineTopHeight +'px',
      paddingBottom: lineBottomHeight +'px'
    }">
      
      <li v-for="item in previewList">
        <div class="col-5 ">
          <a :href="www">
            <img src="https://fakeimg.pl/130x100/?text=Food&font=lobster" alt="img" width="100%">
          </a>
        </div>
        <div class="col-7">
          <div class="shop-list">
            <a :href="www" class="shop-name">{{item.title}}</a>
            <div class="shop-type mt-2">能吃的料理</div>
            <div class="open-time"> 營業時間：11:00~21:00</div>
          </div>
        </div>
      </li>
      
    </ul>
    <div class="load-more-gif">loading...</div>
  </div>
</template>

<script>

export default {
  name: 'vue-list',
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
      twoWays: true
    },
    height: {
      type: Number,
      default: 44
    },
    canScroll: {
      type: Boolean,
      default: true
    },
    dispatchData: {
      type: Function
    }
  },
  data() {
    return {
      lastScrollTop: null,
      distance: 44,
      lineTopHeight: 0,
      lineBottomHeight: 0,
      canLoadmore: true,
      previewList: [],
      displayCount: 0
    }
  },
  mounted () {
    this.initData();
    this.handleScroll();
  },
  methods: {
    initData() {
      // init all data
      this._rowsInWindow = Math.ceil(this.$el.offsetHeight / this.height),
      this._above = this._rowsInWindow * 2,
      this._below = this._rowsInWindow,
      this._max = this._rowsInWindow * this.height;
    },
    handleScroll() {
      let _scrollTop = this.$el.scrollTop,
          _height = this.$el.querySelectorAll('ul')[0].offsetHeight,
          _contentHeight = this.$el.offsetHeight;

      // Counts the number of rows on the current screen
      if (_scrollTop / this.height - Math.floor(_scrollTop / this.height) > 0.5) {
        this.displayCount = Math.ceil(_scrollTop / this.height);
      } else {
        this.displayCount = Math.floor(_scrollTop / this.height);
      }

      // if the maximum height is exceeded, reset the previewList
      if (this.lastScrollTop === null || Math.abs(_scrollTop - this.lastScrollTop) > this._max) {
          this.lastScrollTop = _scrollTop;
      } else {
          if (this.to === this.list.length && _height - _scrollTop - _contentHeight < this.distance) {
            this.canScroll && this.loadmore(this.from, this.to);
          }
          return;
      }

      // get from and to count
      let _from = parseInt(_scrollTop / this.height) - this._above;
      if (_from < 0) {
          _from = 0;
      }
      let _to = _from + this._above + this._below + this._rowsInWindow;
      if (_to > this.list.length) {
          _to = this.list.length;
      }
      this.from = _from;
      this.to = _to;

      // set top height and bottom height
      this.lineTopHeight = _from * this.height;
      this.lineBottomHeight = (this.list.length - _to) * this.height;

      // 調整 data
      if (typeof this.dispatchData === 'function') {
        this.dispatchData(this)
      }

      this.resetPreviewList(_from, _to);

      this.$nextTick(() => {
        let _scrollTop = this.$el.scrollTop,
            _height = this.$el.querySelectorAll('ul')[0].offsetHeight,
            _contentHeight = this.$el.offsetHeight;

        if (_to === this.list.length && _height - _scrollTop - _contentHeight < 0) {
            this.canScroll && this.loadmore(this.from, this.to);
        }
      });
    },
    loadmore(from, to) {
      if (!this.canLoadmore) return;
      this.canLoadmore = false;
      // fetch mock
      setTimeout(() => {
        for(var i = 0; i < 20; i++) {
          this.list.push({
            title: '店家 ' + COUNT++
          });
        }
        let _from = from, _to = to + this._below;
        this.resetPreviewList(_from, _to);
        this.lineBottomHeight = (this.list.length - _to) * this.height;
        this.handleScroll();

        this.canLoadmore = true;
      }, 1500)
    },
    resetPreviewList(from, to) {
      // reset previewList
      this.previewList = [];
      for (; from < to; from++) {
          this.previewList.push(this.list[from])
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
.vue-list{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: "Noto Sans TC", MicrosoftJhengHeiRegular, sans-serif;
  &::scroll-bar{
    width: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    li{
      // border: 1px solid blue;
      margin-bottom: 1rem;
      display: flex;
      .col-5 {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%;
      }
      .col-7 {
        -ms-flex: 0 0 58.333333%;
        flex: 0 0 58.333333%;
        max-width: 58.333333%;
      }
      .shop-list {
        padding-top: 9px;
        letter-spacing: 1.7px;
        text-align: left;
        padding-left: 10px;
      }
      .shop-list .shop-type, .shop-list .open-time {
        color: #525252;
        letter-spacing: 1.3px;
        font-size: 11px;
        margin-top: 3px;
      }
      .mt-2{
        margin-top: 8px !important;
      }
      .shop-name{
        color: #ed5d30;
        font-size: 14px;
        font-weight: 600;
      }
    }
    // li{
    //   text-decoration: none;
    //   height: 44px;
    //   font-size: 14px;
    //   line-height: 3;
    //   text-align: left;
    //   padding-left: 15px;
    //   border-bottom: 1px solid #ddd;
    //   box-sizing: border-box;
    //   background: #fff;
    //   &.line-top, &.line-bottom{
    //     border-bottom: 0;
    //   }
    // }
  }
  .load-more-gif{
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: #fff;
    border-top: none;
    color: #48B884;
  }
}
</style>
