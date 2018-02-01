## 起express server

```
var express = require('express')
var app = express();

//使用環境提供的port或者指定為3000
var port = process.env.PORT || 3000;
app.listen(port);
```

## 從網址抓參數
* 使用路徑（:keyword）
http://localhost:3000/user/john

```
app.get('/user/:keyword/', function (request, response) {
  var myName = request.params.keyword;
  response.send('<html>ㄒ<head></head><body>' + myName + '</body></html>'
  );
})
```

* 使用參數
http://localhost:3000/user/tom?limit=30

```
app.get('/user/:name/', fㄒunction (request, response) {
  var myName = request.params.name;
  var limit = request.query.limit;

  response.send('<html><head></head><body>' + myName + ' has ' + limit + ' posts' + '</body></html>'
  );
})
```

## Middleware

順序有關係，守門員要在前面
* use

```
app.use(function (req, res, next) {
  console.log('可以放一些登入邏輯等等');
  //要寫next()才會執行後續的程式
  next();
})
```

* 指定router使用

```
app.get('/', login, function (req, res) {
  res.send('index');
})

function login(req, res, next) {
  var _url = req.url;
  if (_url == '/') {
    next();
  } else {
    res.send('出錯了！')
  }
}
```

* 404 找不到頁面

```
app.use(function (req, res, next) {
  res.status(404).send('抱歉，找不到頁面');
})
```

* 500 程式錯誤

```
app.use(function (err, req, res, next) {
  res.status(500).send('程式有問題，請再試一次');
  console.error(err.stack);
})
```

* 指定靜態檔案的根路徑

```
app.use(express.static('public'));
```