# Event Handling

## v-on

可以利用 v-on 來做事件綁定

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app_env">
    <p>{{message}}</p>
    <button v-on:click="reverseMessage">逆轉消息</button>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    data: {
      message: "Hello Vue!"
    },
    methods: {
      reverseMessage: function(){
        this.message = this.message.split('').reverse().join('');
      }
    }
  });
</script>
</html>
```

這是最簡單基本的用法

也可以直接針對變數做處理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app_env">
    <button v-on:click="counter += 1">Add 1</button>
    <p>The button above has been clicked {{ counter }} times</p>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    data: {
      counter: 0
    }
  });
</script>
</html>
```

在範例中當收到 `click` 事件的時後

會直接對 couter 加一

並且顯示在頁面上

## 使用參數

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app_env">
    <button v-on:click="say('Hi')">Say Hi</button>
    <button v-on:click="say('what')">Say What</button>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message){
        alert(message);
      }
    }
  });
</script>
</html>
```

### Event object

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app_env">
    <button v-on:click="warn('Hello Submit', $event)">Submit</button>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    methods: {

      warn(message, event){
        if(event){
          alert('have event');
          event.preventDefault();
        }
        alert(message);
      }
    }
  });
</script>
</html>
```

## Event Modifiers

蠻常會使用到 `preventDefault()` 或是 `stopPropagation()`

可以在 method 中直接使用

但是也可以利用 `Event Modifiers` 來達到這些行為

提供五種 properties

* stop - stopPropagation
* prevent - preventDefault
* capture - 延後在 event lister 之後
* self - 只有 event.target 是此元素的時候才執行
* once - 點擊事件只會出現一次
* passive - 對應 listener 中的 passive 

### prevent

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <form action="http://google.com.tw" v-on:submit.prevent="onSubmit">
      <input type="submit" value="送出"> 
    </form>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    methods: {
      onSubmit: function(event){
        console.log("submit");
      }
    }
  });
</script>

</html>
```

prevent 可以阻止 form 送出 

效果跟 `evnet.preventDefault` 一樣

### stop

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <table v-on:click="say('hello')">
      <tr>
        <td v-on:click.stop="say('hi')">sayHi</td>
      </tr>
      <tr>
        <td> say hello</td>
      </tr>
    </table>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message) {
        alert(message);
      }
    }
  });
</script>
</html>
```

因為在 `table` 綁定了一個 event `say('hello')`

而在內部再綁一個 `say('Hi')`

若是沒有使用 `click.stop` 的話

當你點期 SayHi 的時候

應該會觸發兩個 Event `say('hello')` 和 `say('hi')`

但是在使用 `click.stop` 之後效果與 `stopPropagation` 一樣

他只會執行 `say('Hi')` 而避掉其他所有 Event

### capture

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <div v-on:click.capture="say('step2')">
      <button v-on:click="say('step1')">capture</button>
    </div>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>


  var app_env = new Vue({
    el: "#app_env",
    methods: {
      
      say(message) {
        alert(message);
      }
    }
  });
</script>

</html>
```

由上面的範例 若是 `div` 單純使用 v-on:click 做事件綁定

會先執行內部 `button` 的事件

然後才執行到 `div` 的事件

也就是說順序是 `step1 > step2`

但是若是使用 `click.capture` 他會優先執行

然後結束後才執行內部的事件

也就是順序會變成 `step2 > step1`

### Self

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <div v-on:click.self="say('self')">
      <button v-on:click="say('Hi')">say Hi</button>
      <p>Nothing</p>
    </div>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>


  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message) {
        alert(message);
      }
    }
  });
</script>
</html>
```

這個範例是要解釋 `self` 這個範例

他在內部 say Hi 被點擊的時候只會 `alert('Hi')` 但是部會 `alert('self')`

因為他的點擊在 button 之上

而點擊 `Nothing` 的時候雖然他在 div 內

但是因為你是使用 `self` 來綁定事件

所以也不會有行為

點擊這兩個區間的中間的時候

會觸發到 `div` 的事件區域 而沒有其他內部元素的時候

才會 `alert('self')`

也就是你的點擊必須再除了內部元素之外的其他區域才會被有效呼叫到 `alert('self')`

### Once

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <button v-on:click.once="say('Once')">alert Once</button>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message) {
        alert(message);
      }
    }
  });
</script>

</html>
```

這個事件在綁定之後只會呼叫一次

而之後的點擊都會無效

## 鍵盤事件

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <input v-on:keyup.13="say('你按了 Enter')">
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message) {
        alert(message);
      }
    }
  });
</script>

</html>
```

上面範例當你在 input `focus` 的時候

按了 `Enter` 他會 `alert("你按了 Enter")`

之所以會偵測到是因為他抓到 [keycode](https://css-tricks.com/snippets/javascript/javascript-keycodes/)

但是 `keycode` 很難記

所以 Vue 準備了幾個特定的案件 Event

* .enter
* .tab
* .delete (捕获“删除”和“退格”键)
* .esc
* .space
* .up
* .down
* .left
* .right

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <input v-on:keyup.13="say('你按了 Enter')">
    <input v-on:keyup.enter="say('你按了 Enter2')">
    <input @keydown.tab="say('你按了 Tab')">
    <input v-on:keyup.f1="say('你按了 F1')">
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  Vue.config.keyCodes.f1 = 112;

  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message) {
        alert(message);
      }
    }
  });
</script>
</html>
```

利用這些特殊字也可以綁定相對應的鍵盤按鍵

或是也可以自定義名稱與 `keycode` 配對

## 系統按鍵組合

* ctrl
* alt
* shift
* meta

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app_env">
    <input @keyup.alt.67="say('你按了 alt + c')">
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  Vue.config.keyCodes.f1 = 112
  
  var app_env = new Vue({
    el: "#app_env",
    methods: {
      say(message) {
        alert(message);
      }
    }
  });
</script>

</html>
```