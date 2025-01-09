---
title: JavaScript
date: 2025-01-09 14:06:30
tags:
categories:
excerpt: 一种轻量级的、解释型的、面向对象的编程语言
math: true
---

# 创建JS代码块
## 变量
### `var` or `let`?
`var`先于`let`的产生, 后者是现代版本的JS中新的关键字.

使用`var`, 可以对一个先前已被声明且初始化的变量重新声明, 这不会带来报错, 代码依旧可以工作. 但是`let`并不适用.
```js
myName = "Chris";

function logName() {
  console.log(myName);
}

logName(); //输出"Chris"

var myName = "Aniya";
logName(); //输出"Aniya"
```

除此之外, 可以使用`var`前后声明相同的变量, 这并不会报错:
```js
var myName = "Chris";
var myName = "Bob";
```

而`let`只能声明一次:
```js
let myName = "Chris";
myName = "Bob";
```

因此, 在代码编写中应尽量**多使用**`let`而非`var`, 这可以帮助我们排除无意中重新命名相同变量而导致的错误.


### 变量命名的规则
与C语言类似, 建议以 **字母、数字、下划线** 组成的标识符来命名变量.
- 不可用`_`开头, 因为可能被JS设计为特殊的含义;
- 不可用数字开头, 否则引发错误;
- 大小写敏感;
- 建议采用 **小写驼峰命名法** ,即小写整个命名的第一个字母然后大写剩下单词的首字符;
- 避免使用保留字, 比如`var`,`let`,`for`等.

### 变量类型

```js
let myAge = 20 ;// 数字
let dolphinGoodbye = "So long and thanks for all the fish"; // 字符串
let test = 6 < 3; //boolean

//数组类型
let myNameArray = ["Chris", "Bob", "Jim"];
let myNumberArray = [10, 15, 40];

//对象类型
let dog = { name: "Spot", breed: "Dalmatian" };

```
> 对象类型的访问与结构体相似, `dog.name;`

在上面的几种变量类型中, 我们都采用`let`关键字声明变量, 这体现了JS是一种 **动态类型语言** ,即无需指定变量包含的数据类型.

同时, 这也意味着我们可以像`python`一样对同一个变量先后赋值不同类型的值:
```js
let myNumber = "500";
typeof myNumber;
// 输出 'string'

myNumber = 500; 
typeof myNumber;
//输出'number'
```


## 函数
- $\underline{提升}$ 解释器在执行代码之前，似乎将函数、变量、类或导入的声明移动到其作用域的顶部的过程.
```js
exampleFunction();

function exampleFunction() {
  console.log("函数内");
  console.log(x);
}
```
> 由于 **提升** 的存在, 上述的函数调用不会出错.


### 默认参数
在编写函数时, 可以通过在参数名称后添加`=`, 再指定默认值, 这样当调用函数时, 如果没有传入该参数, 则使用默认值。
```js
function greeding(name = "my friend") {
    console.log(`Hello, ${name}!`);
}
hello(); //Hello, my friend!
hello("world"); //Hello, world!
```

### 箭头函数
在了解箭头函数的作用之前, 需要先介绍 $\underline{匿名函数}$:
```js
function myFunction() {
  alert("你好");
}

// 匿名函数
(function () {
  alert("你好");
});
```
> 正如其名, 匿名函数没有函数名, 不能被调用, 但可以作为参数传入其他函数中.

如果我们希望在监听某个事件发生时调用简单的函数来处理, 则可以通过调用上述的匿名函数实现:
```js
function logKey(event) {
  console.log(`You pressed "${event.key}".`);
}

textBox.addEventListener("keydown", logKey);
```
这部分代码通过监听html元素的keydown事件, 调用函数输出按下的键盘按键. 我们可以通过匿名函数来简化书写:
```js
textBox.addEventListener("keydown", function (event) {
  console.log(`You pressed "${event.key}".`);
});
```
>只需传入函数体, 而不需要函数名, 就可以实现监听事件并调用函数的功能.

而**箭头函数**则是在此情况下更简洁的函数定义方式:
```js
textBox.addEventListener("keydown", (event) => {
  console.log(`You pressed "${event.key}".`);
});

//如果函数只接受一个参数, 也可以省略参数周围的括号
textBox.addEventListener("keydown", event => {
  console.log(`You pressed "${event.key}".`);
});
```

如果只包含一行的`return`,则可以忽略`{}`和`return`关键字:
```js
const originals = [1, 2, 3];

const doubled = originals.map(item => item * 2);

console.log(doubled); // [2, 4, 6]
```
> `item => item * 2`等价于:
```js
function doubleItem(item) {
  return item * 2;
}
```

#### 一个实例
```html
<input id="textBox" type="text" />
<div id="output"></div>
```
```js
const textBox = document.querySelector("#textBox");
const output = document.querySelector("#output");

textBox.addEventListener("keydown", (event) => {
  output.textContent = `You pressed "${event.key}".`;
});
```
通过监听输入框的keydown事件, 输出按下的键盘按键.

### 函数作用域和冲突
$\underline{作用域}$ 指当前的执行上下文, 在其中的值和表达式可以被访问. 
- 全局作用域: 脚本模式运行所有代码的默认作用域;
- 模块作用域: 模块模式中运行代码的作用域;
- 函数作用域: 由函数创建的作用域

和C语言相似, 在函数外部`let`定义的变量, 以及`const`定义的常量可以在函数内部访问.

如果HTML调用了多个外部JS文件, 其中具有相同的函数名, 那么只能访问的第一个函数, 第二个函数将被忽略:
```html
<!-- Excerpt from my HTML -->
<script src="first.js"></script>
<script src="second.js"></script>
<script>
  greeting();
</script>
```
> 如果两个JS文件都定义了`greeting`函数, 则只有第一个文件中的函数才会被调用.

