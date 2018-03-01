為了修矮 router 中的每一頁的 title ，設置了 Navigation Guards

```
router.beforeEach((to, from, next) => {
  document.title = to.meta.title(to);
  next();
});
```

並在 route 中加入 meta，title 的值需以 function 方式 return 字串

```
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
      meta: {
        title: route => {
          return "訂便當系統";
        }
      },
      children: [
        {
          path: "index",
          name: "index",
          component: Index,
          meta: {
            title: route => {
              return "訂便當 首頁";
            }
          }

  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title(to);
  next();
});

export default router;
```
