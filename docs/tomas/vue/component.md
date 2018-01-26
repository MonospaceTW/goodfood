# Component

## 基本使用

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
  <div id="component_temp">
    <ol>
        <todo-item></todo-item>
        <todo-item></todo-item>
    </ol>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  Vue.component('todo-item', {
    template: '<li>這是個待辦事項</li>'
  });
  const components = new Vue({
    el: "#component_temp",
  });
</script>
</html>
```

### prop

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
  <div id="component_temp">
    <ol>
      <todo-item
        v-for="item in groceryList"
        v-bind:todo="item"
        v-bind:key="item.id"></todo-item>
    </ol>

  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
  });
  const components = new Vue({
    el: "#component_temp",
    data: {
      groceryList: [
        { id: 0, text: '蔬菜' },
        { id: 1, text: '奶酪' },
        { id: 2, text: '隨便其他人吃什麼' }
      ]
    }
  });
</script>
</html>
```

在 `components` 中增加 data.groceryList

並且在 `todo-item` 終將字串修改為 `todo.text`

用 `v-for` 去針對 `groceryList` 來做迴圈

將每個物件命名為 `item` 與 `component` 中的 todo 做綁定

而在 `component` 中的每個元件都會取得 `todo` 做區塊的頁面顯示

## Web Component

[參考官網](https://www.webcomponents.org/)