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
        <div class="result_btn">我要加訂</div>
        <div class="deadline">截止時間：10:30</div>
        <div class="listtop_1">訂單</div>
        <div class="row">
            <div class="item">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
        </div>
        <div class="row">
            <div class="item">咖哩鍋貼</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
        </div>
        <div class="row_digital">
            <div class="item">總計</div>
            <div class="count"></div>
            <div class="price">$120</div>
            </div>
        <div class="listtop_2">訂單明細</div>
        <div class="row">
            <div class="name">Clover</div>
            <div class="item_2">招牌海鮮意麵</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
        </div>
        <div class="row">
            <div class="name">Kant</div>
            <div class="item_2">咖哩鍋貼</div>
            <div class="count">x1</div>
            <div class="price">$60</div>
        </div>
        <div class="row">
            <div class="name"></div>
            <div class="item_2"></div>
            <div class="count"></div>
            <div class="price row_digital_2">$120</div>
        </div>
        
</div> 
</template>

<style lang='scss'>
@import "../scss/_reset.scss";
@import "../scss/_setting.scss";
$font-xl: 17px;
$font-l: 16px;
$font-m: 13px;
$font-s: 12px;

.container {
  margin: 30px 26px;
  text-align: center;
  color: $fontcolor;
  font-size: $font-m;
}
.result_title {
  font-size: $font-xl;
  color: $maincolor;
  margin-bottom: 7px;
}

hr {
  border: 0.8px solid $maincolor;
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
  width: 95px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  margin: 0 auto;
  text-align: center;
  background: $maincolor;
  border-radius: 21.5px;
}
.deadline {
  font-size: $font-s;
  margin: 6px 0 28px 0;
}
.listtop_1,
.listtop_2 {
  font-size: $font-l;
  border-bottom: 1.5px solid $maincolor;
  border-top: 1.5px solid $maincolor;
  padding: 4px 0;
}

.listtop_2 {
  margin-top: 60px;
}
.row,
.row_digital {
  display: flex;
  width: 90%;
  line-height: 18px;
  text-align: left;
  margin: 13px 10px;
}

.row_digital {
  margin-top: 20px;
}

.row_digital_2 {
  margin-top: 12px;
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

