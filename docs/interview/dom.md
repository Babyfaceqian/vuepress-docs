# Dom
```html
<html>
  <body>
    <div id="parent" onclick="console.log('parent inline')">
      <input id="btn" type="button" name="按钮" onclick="console.log('btn inline')" />
    </div>
  </body>
  <script>
    var btn = document.getElementById('btn');
    var parent = document.getElementById('parent');
    btn.addEventListener('click', function(){
      console.log('btn1');
    })
    btn.addEventListener('click', function(){
      console.log('btn2');
    }, true)
    parent.addEventListener('click', function(){
      console.log('parent 1');
    })
    parent.addEventListener('click', function(){
      console.log('parent 2');
    }, true)
  </script>
</html>
```
点击按钮后，得到以下顺序结果。
```
parent 1
btn inline
btn 1
btn 2
parent inline
parent 2
```
解释：非目标元素，按照捕获、内联、冒泡事件的顺序执行回调；目标元素，先执行内联事件回调，然后按绑定顺序执行事件回调，与是否捕获无关。