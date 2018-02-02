# 簡介

SASS是一個可以透過編譯轉換成CSS，讓browser看得懂的語言。
其中SASS可以分成舊的`.sass`和新的`.scss`，
`.sass`與`.css`差異較大，因其使用大量的縮排，且不使用大括弧的格式。
`.scss`與`.css`差異較小，將CSS樣式直接貼到scss內即可馬上使用。

舉例
html
```html
<body>
  <div class="container">
    <div class="testbox">
      <p>Hello World</p>
    </div>
  </div>
<body>
```

**sass**

```sass
.container
  width: 100%
  .testbox
    p
      font-size: 12px
      color: #fff
  
```
**scss**

```scss
.container{
  width: 100%;
  .testbox{
    p{
      font-size: 12px;
      color: #fff;
    }  
  }
}
```

**css**

```css
.container{
  width:100%
}

.testbox p{
  font-size: 12px;
  color: #fff;
}
```

sass和scss寫法各有優缺點，sass寫起來很快，但是要特別注意縮排，而且不能直接copy `.css`來使用。
scss寫起來比sass慢，但是可以直接copy`.css`來使用。
但是兩者都pure css還要簡便，因此選擇一種自己喜歡的即可，我選擇`scss`。

------

# 變數
scss支援css所不支援的**變數**，在建構網頁的時候，前端設計師設計出有主色系的圖，（即網頁上的顏色重複且大量被使用）

因此變數可以幫助工程師不需要一直寫一樣的顏色代碼。
其實，不只顏色，css數值幾乎都可以用變數來取代。
**好處是**：如果要更改顏色，只需要修改變數，整個網頁都會跟著變換顏色，不需要一個一個找出css樣式，方便許多。

變數用一個**$**後面加上名稱表示，常整理成一個`_variable.scss`。

舉例：
html
```html
<body>
  <div class="cycle1">1</div>
  <div class="cycle2">2</div>
  <div class="cycle3">3</div>
  <div class="cycle4">4</div>
</body>
```

scss
```scss
$cycle-bg-color: black;

.cycle1{
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: $cycle-bg-color;
}
      .
      .
      .
.cycle2{
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: $cycle-bg-color;
}
      .
      .
      .
.cycle3{
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: $cycle-bg-color;
}
      .
      .
      .
.cycle4{
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: $cycle-bg-color;
}

```

這樣即可將所有的`.cycle`背景色都變成黑色。
其他數值皆可用變數替代。
有沒有發現

```scss
  border-radius: 50px;
  width: 100px;
  height: 100px;
```
重複被寫了4次？
等等要介紹的是`@extend`
不夠再把變數介紹的更詳細吧！
除了數值，還可以用`#{}`帶入字串

舉例

scss
```scss
$bg:'../img/';
$button-font-color: blue;

.container{
  background: url(#{$bg}container_bg.png);
}

.button-#{$button-font-color}{
  color: $button-font-color;
}
```

編譯出來會是

css
```css
.container{
  background: url(../img/container_bg.png);
}

.button-blue{
  color: blue;
}
```

# % + @extend

`%`用來將一直重複的CSS樣式整合，之後用`@extend`將之呼喚出來使用。
其中`%cycle-style`就算寫成`.cycle-style`其實也是可以的。
但是編譯出的`.CSS`會多出一些不必要的樣式，而且要注意`class`命名，所以使用`%`是比較洽當的。

舉例：

scss
```scss
%cycle-style{
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: black;
}

.cycle1{
  @extend %cycle-style;
}
      .
      .
      .
.cycle2{
  @extend %cycle-style;
}
      .
      .
      .
.cycle3{
  @extend %cycle-style;
}
      .
      .
      .
.cycle4{
  @extend %cycle-style;
}

```

這樣即使各個圓相距很遠，一樣可以只修改`%`內的CSS樣式，全部的圓都有效。

那如果，同樣都是圓，卻有些東西不想要一樣呢？（ex：顏色）
那就需要用到`@mixin`了

# @mixin + @include
使用`@mixin`取代`%`可以讓我們使用`變數`。

舉例
scss
```scss
@mixin cycle-style($width,$height,$bg-color){
  border-radius: 50px;
  width: $width;
  height: $height;
  background-color: $bg-color;
}

.cycle1{
  @include cycle-style(100px,100px,black);
}
      .
      .
      .
.cycle2{
  @include cycle-style(100px,100px,black);
}
      .
      .
      .
.cycle3{
  @include cycle-style(200px,200px,yellow);
}
      .
      .
      .
.cycle4{
  @include cycle-style(300px,300px,blue);
}

```
這樣即可得到漸漸變大，顏色不一樣的圓了。
如果有常用的數值也可直接寫在@mixin內。

scss
```scss
@mixin cycle-style($width:100px,$height:100px,$bg-color:black){
  border-radius: 50px;
  width: $width;
  height: $height;
  background-color: $bg-color;
}

.cycle1{
  @include cycle-style;
}
      .
      .
      .
.cycle2{
  @include cycle-style;
}
      .
      .
      .
.cycle3{
  @include cycle-style(200px,200px,yellow);
}
      .
      .
      .
.cycle4{
  @include cycle-style(300px,300px,blue);
}

```

這樣可以更簡潔。

PS：在sass時，`@include`可使用`+`代替。