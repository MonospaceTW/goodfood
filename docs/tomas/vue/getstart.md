# Vue

綁定顯示訊息

```html
<div id="app">
  {{ message }}
</div>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
```

也可以利用綁定元素特性

```html
<div id="app-2">
  <span v-bind:style="style">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```javascript
  var app2 = new Vue({
    el: "#app-2",
    data: {
      style: 'color: red;'
    }
  });
```

在 終端機中輸入

```
app2.style = "color:green;";
```

可以看到你的文字都變成了綠色

## Vue 中的條件判斷

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
  <div id="app_if">
    <h1 v-if="ok">It's OK!</h1>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  const app_if = new Vue({
    el: "#app_if",
    data: {
      ok: true
    }
  });
</script>
</html>
```

在終端機中輸入 app_if.ok = false

訊息會因為判斷是 `ok` 是 false 而隱藏

### else

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
  <div id="app_if">
      <h1 v-if="ok">It's OK!</h1>
      <h1 v-else>It's Not OK</h1>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  const app_if = new Vue({
    el: "#app_if",
    data: {
      ok: true
    }
  });
</script>
</html>
```

在終端機中輸入 app_if.ok = false

訊息會因為判斷是 `ok` 是 false 而顯示 It's Not OK!

### else if (2.1 以上)

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
  <div id="app_if">
    <!-- <h1 v-if="ok">It's OK!</h1>
    <h1 v-else>It's Not OK</h1> -->

    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  const app_if = new Vue({
    el: "#app_if",
    data: {
      ok: true,
      type: "A"
    }
  });
</script>

</html>
```

在上方的範例中 終端機輸入 app_if.type = "B"

則會改變為 B

輸入 app_if.type = "D"

則顯示 Not A/B/C

和我們一般在使用的 if else 是一模一樣的

利用這個方式來控制條件顯示

## v-show

另外還有一種方式 `v-show` 來做簡易的判斷是否顯示

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
  <div id="app_if">
    <h1 v-show="ok">It's OK!</h1>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  const app_if = new Vue({
    el: "#app_if",
    data: {
      ok: true,
      type: "A"
    }
  });
</script>
</html>
```

使用這個方式依舊在 終端機中輸入

app_if.ok = false;

一樣會隱藏 `It's OK!`

## v-if VS v-show

雖然依舊是隱藏訊息

但是 `v-if` 條件符合的時候才會在真實的 `DOM` 中存在

而 `v-show` 則是在 style 中塞入 `display:none;` 

利用 CSS 來隱藏訊息

這個 Node 依舊在 DOM 中存在

## Feature

[if on template](https://vuejs.org/v2/guide/conditional.html#Conditional-Groups-with-v-if-on-lt-template-gt)

因為尚未了解 `template` 之後再補