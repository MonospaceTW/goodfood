<template>

<div class="container">
    <h1 class="result_title">團訂結果</h1>
    <hr />
    <div class="result_subtitle">八方雲集鍋貼水餃專賣店</div>
    <div class="result_info">
        <p>滿500元可外送</p>
        <p>營業時間:9:00-21:00</p>
        <p>地址：台中市台中路123號</p>
        <p>電話：04-24803248</p>
    </div>
        <div class="deadline">截止時間：10:30</div>
        <div class="result_btn">返回訂購頁</div>
        <div class="listtop_2">訂單明細</div>

        <div class="region_top">
          <div class="row">
            <div class="name">Clover</div>
            <div class="item_2">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
          </div>
          <div class="row ">
            <div class="name"></div>
            <div class="remarks">不要加蔥</div>
            <div class="count"></div>
            <div class="price"></div>
          </div>
        </div>

        <div class="region_top">
          <div class="row">
            <div class="name">Clover</div>
            <div class="item_2">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
          </div>
          <div class="row ">
            <div class="name"></div>
            <div class="remarks">不要加蔥</div>
            <div class="count"></div>
            <div class="price"></div>
          </div>
        </div>

        <div class="region_top">
          <div class="row">
            <div class="name">Clover</div>
            <div class="item_2">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
          </div>
          <div class="row ">
            <div class="name"></div>
            <div class="remarks">不要加蔥</div>
            <div class="count"></div>
            <div class="price"></div>
          </div>
        </div>

        <div class="listtop_1">訂單</div>

        <div class="region_down">
          <div class="row">
            <div class="item">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
          </div>
          <div class="row">
            <div class="remarks">不要加蔥</div>
            <div class="count"></div>
            <div class="price"></div>
          </div>
        </div>

        <div class="region_down">
          <div class="row">
            <div class="item">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
          </div>
          <div class="row">
            <div class="remarks">不要加蔥</div>
            <div class="count"></div>
            <div class="price"></div>
          </div>
        </div>

        <hr>

        <div class="row_digital">
            <div class="item row_digital_spacing">總計</div>
            <div class="count row_digital_spacing"></div>
            <div class="price row_digital_spacing">$120</div>
        </div>
        
</div>

</template>

<style lang='scss' scoped>
@import "../scss/index.scss";

$font-xl: 18px;
$font-l: 16px;
$font-m: 13px;
$font-s: 12px;

.container {
  margin: 30px 26px;
  text-align: center;
  font-size: $font-m;
  color: $gray_two;
}
.result_title {
  font-size: $font-xl;
  color: $black;
  margin-bottom: 7px;
}

hr {
  border: 0.8px solid $white;
  margin-top: 5px;
}

.result_subtitle {
  font-size: $font-l;
  margin: 30px 0 9px 0;
}
.result_info {
  font-size: $font-s;
  line-height: 16px;
  margin-bottom: 24px;
}
.result_btn {
  display: block;
  width: 130px;
  height: 46px;
  line-height: 46px;
  color: $orange;
  margin: 0 auto 21px;
  text-align: center;
  font-size: $font-m;
  border: 1px solid $btn_primary_border;
  border-radius: 21.5px;
  box-shadow: $box_shadow;
}
.deadline {
  font-size: $font-s;
  color: $red;
  margin: 11px 0 12px 0;
}
.listtop_1,
.listtop_2 {
  font-size: $font-l;
  border-bottom: 1.5px solid $white;
  border-top: 1.5px solid $white;
  padding: 4px 0;
}

.listtop_2 {
  margin-top: 21px;
}
.row,
.row_digital {
  display: flex;
  width: 95%;
  line-height: 18px;
  text-align: left;
  margin: 13px 10px;
}

.row_digital_spacing {
  margin: -10px 0 50px 0;
}

.remarks {
  color: $blue;
  font-size: $font-s;
  margin-top: -10px;
}

.regin {
  line-height: none;
}

.row_digital {
  margin-top: 20px;
}

.count {
  width: 20%;
}

.price {
  width: 20%;
  text-align: right;
}
.item {
  width: 60%;
}

.item_2 {
  width: 35%;
}
.name {
  width: 25%;
}
</style>
