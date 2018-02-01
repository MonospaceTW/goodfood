# flexbox 排版

flexbox 可以分為外容器與內元素，


在對齊方式可以分為全體與自身，
並依據軸線來對齊，
軸線可分為主軸與交錯軸，

###外層容器屬性

最外層容器的 CSS 樣式裡一定要加上 display: flex;

可使用 flex-direction 決定軸線的對齊方式，
在 flex-direction 為 row 的情況下 justify-content 可以調整主軸水平對齊的位置，
在 flex-direction 為 row 的情況下 align-items 可以調整交錯軸垂直對齊的位置，

flex-direction 為　row-reverse 的情況下主軸水平對齊的起始與結束方向與原來相反，

在 flex-direction 為 column 的情況下 主軸代表調整垂直對齊的軸線，
交錯軸代表調整水平對齊的軸線，

在 flex-direction 為 column-reverse 的情況下主軸垂直對齊的起始與結束方向與原來相反，

外層容器的 justity-content 與 align-items 屬性有許多屬性值可以調整內元素的對齊方式，

[justityfy-content的屬性值](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)


[align-items的屬性值](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)


flex-wrap 可以決定內元素是否換行:


[MDN flex-wrap說明](https://developer.mozilla.org/zh-TW/docs/Web/CSS/flex-wrap)

flex-flow 合併了 flex-direction 與 flex-wrap 可以同時設定兩個屬性與值:

[flex-flow用法](https://css-tricks.com/almanac/properties/f/flex-flow/)


### 內元素屬性

flex-grow 可將內元素伸展，
[flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/)


[MDN flex-grow 說明](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)

flex-shirk 可將內元素收縮，
[flex-shirk](https://css-tricks.com/almanac/properties/f/flex-shrink/)

[MDN flex-shirk 說明](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)

flex-basis 內元素固定的絕對值，
[flex-basis](https://css-tricks.com/almanac/properties/f/flex-basis/)


[MDN flex-basis 說明](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)

order 用來排序內元素，

align-self 是內元素的自身的對齊方式，

[MDN align-self 說明](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)

### 其他參考資料


[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[Flex 教學](https://paper.dropbox.com/doc/Flex-tvaJQP4EtjCMAK0pgnpGt)




























