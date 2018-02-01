## 把component以v-for方式渲染
在列表渲染時，如果使用 v-for 的是組件而非 html 元素，
那麼 vue 會發出 warning 是它應該要有 key
讓 vue 辨識組件與資料的對應關係

```
(Emitted value instead of an instance of Error) <todoItem v-for="todo in todos">: component lists rendered with v-for should have explicit keys. 
```

解法：

    <todoItem v-for="(todo,idx) in todos" :data="todo" :key="idx"></todoItem>

## Component template內只能有一個root element

Component template should contain exactly one root element.

錯誤：
```
<template>
  <div></div>
  <div></div>
</template>
```

正確：
```
<template>
  <div>
    <div></div>
    <div></div>
  </div>
</template>
```