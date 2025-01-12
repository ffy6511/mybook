---
title: JavaScript
date: 2025-01-09 14:06:30
tags: 
categories: 前端学习
excerpt: 一种轻量级的、解释型的、面向对象的编程语言
math: true
index_img: /img/JS.png
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

<br>

事件处理函数的默认接受值是`event`:
```html
<button>
onclick
</button>

<p>
nothing here
</p>

<script>
btn = document.querySelector("button")
para = document.querySelector("p")

btn.onclick = click;

function click(string){
  console.log("clicked!")
  para.textContent = string;
}
</script>
```
1. 上述的`btn`在点击之后调用函数`click`, 该函数需要一个参数`string`, 由于`btn.onclick = click;`的绑定方式, 我们无法指定传参的值, 因此点击之后的`para`的内容显示为: `[object PointerEvent]`;
2. `textContent`是属性而非方法, 因此采用赋值实现;


```js
btn.onclick = function click(string) {
  console.log("clicked!")
  para.textContent = "You have clicked the button!";
}
```
> 将上述的绑定方式如此改写, 可以在`btn`外对`string`进行赋值, 然后点击按钮可以传入指定参数供后续处理.



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

## 数据类型
### 数字和操作符
大部分与C语言相同, 概括需要注意的差异:
- JS当中只有一种数字类型 -- `number`, 对于整型或者浮点数的初始化得到的量, 由`typeof`均得到`number`;
- 算术运算符: 求幂为`**`;
- 常量无法使用自增或自减,~~好像也是C语言的 忘了~~
- `===`表示严格等于, `!==`表示不等于;
> 同时存在`==`和`!=`来判断是否相等, 但是它们只是测试 **值** 是否相等, 会忽略数据类型的差异; 而上述的比较会同时比较数据类型. 因此推荐使用`===`和`!==`来避免类型不一致的错误.

### 字符串
创建字符串
```js
let myString = "A string";
const constString = myString;
console.log(constString);
//A string
``` 
可以使用单引号,双引号和**反引号**来包裹字符串, 但是必须确保字符串的开头和结尾使用相同的字符:
```js
const single = '单引号';
const double = "双引号";
const backtick = `反引号`;
```

反引号包裹的字符串称为$\underline{模板字符串}$, 大多数情况下,它与其他两种字符串类似, 但是具有特殊的属性:
- 可以嵌入 **JavaScript**;
- 可以声明**多行**的模板字面量.

#### 字符串的拼接
字符串的拼接有两种方法, 我们先介绍上述提到的模板字符串中的 $\underline{串联法}$:
```js
const name = "克里斯";
const greeting = `你好，${name}`;
console.log(greeting); // "你好，克里斯"
```
> 在模板字面量中用`${}`包装JS的变量或者表达式.


```js
const one = "你好，";
const two = "请问最近如何？";
const joined = `${one}${two}`;
console.log(joined); // "你好，请问最近如何？"
```
> 连接2个变量.

```js
const song = "青花瓷";
const score = 9;
const highestScore = 10;
const output = `我喜欢歌曲《${song}》。我给它打了 ${
  (score / highestScore) * 100
} 分。`;
console.log(output); // "我喜欢歌曲《青花瓷》。我给它打了 90 分。"
```
> 在模板字面量的`${}`内部包含表达式.

<br>
除此之外,对于普通的字符串(使用单引号或者双引号得到的字符串), 我们可以使用`+`直接连接:
```js
const greeting = "你好";
const name = "克里斯";
console.log(greeting + "，" + name); // "你好，克里斯"
```

#### 多行字符串
模板字符串会**保留**源代码中的换行符，因此可以编写跨越多行的字符串:
```js
const newline = `终于有一天，
你知道了必须做的事情，而且开始……`;
console.log(newline);

/*
终于有一天，
你知道了必须做的事情，而且开始……
*/
```

如果希望用普通的字符串得到等效的输出, 必须在字符串中包含`\n`,而非直接跨行:
```js
const newline = "终于有一天，\n你知道了必须做的事情，而且开始……";
console.log(newline);

/*
终于有一天，
你知道了必须做的事情，而且开始……
*/
```

#### 显示引号
1. $\underline{转义}$  通过在符号前加上反斜杠`\`, 可以转义字符串中的特殊字符,包括字符串中的引号:
```js
const bigmouth = 'I\'ve got no right to take my place…';
```
2. 换用其他字符: 在字面量内用不同于包裹字符串的引号:
```js
const goodQuotes1 = 'She said "I think so!"';
const goodQuotes2 = `She said "I'm not going in there!"`;
```


#### 常用方法
对于字符串对象实例,其常用的方法:
- `.length`: 获取字符串的长度;
- `[]`: 返回字符串中对应索引的字符, 索引同样从`0`开始;
- `.indexOf("")`: 查找子字符串
  - **input**: 希望查找的子字符串;
  - **output**: 子字符串开始的下标(如果不存在则返回`-1`);
- `.slice(indedxStart, indexEnd)`: 截取字符串
  - **input**: 起始下标, 结束下标(不包含该下标). 如果不存在结束下标则提取之后剩余的全部字符;
  - **output**: 截取的子字符串;

更多的`slice`知识:
1. $\underline{标准化负值}$ 如果索引是个负数, 取`index+str.length`进行标准化;
2. 如果`indexStart`大于`str.length`, 返回空字符串;
3. 如果标准化负值之后, `indexStart`大于`indexEnd`, 也返回空字符串;
 
- `.toLowerCase()` & `.toUpperCase()`: 转换字符串中的所有字符为小写或大写;
- `.replace(original, new)`: 替换字符串中`original`子字符串为`new`;
> 此时不会直接改变原字符串的值, 而是返回一个修改之后的字符串. 因此, 如果想要将原来的值替换, 需要用上述方法得到的值去赋值原来的字符串.

#### Cases
利用 **indexOf** 和 **slice** 方法, 获取新字符串:
- **input**: `"str3"`三位长字符串+`"..."`(无关字符串)+`";"`+`strLast`(剩余字符串);
- **output**: `"str3"+";"+strLast`

```js
var stations = ['MAN675847583748sjt567654;Manchester Piccadilly',
                'GNF576746573fhdg4737dh4;Greenfield',
                'LIV5hg65hd737456236dch46dg4;Liverpool Lime Street',
                'SYB4f65hf75f736463;Stalybridge',
                'HUD5767ghtyfyr4536dh45dg45dg3;Huddersfield'];

for(var i = 0; i < stations.length; i++){
    var input = stations[i];
    var str3 = input.slice(0,3);
    var strLast = input.slice(input.indexOf(";")+1); //indexOf获取;位置
    var output = str3 + ";" + strLast;
}
```

---

通过 **indexOf** 根据子字符串筛选字符串数组:
- **input**: 可能包含 *Christmas* 的字符串数组;
- **output**: 包含 *Christmas* 的字符串数组;

```js
var list = document.querySelector('.output ul');
list.innerHTML = '';
var greetings = ['Happy Birthday!',
                 'Merry Christmas my love',
                 'A happy Christmas to all the family',
                 'You\'re all I want for Christmas',
                 'Get well soon'];

for(var i = 0; i < greetings.length; i++) {
  var input = greetings[i];
  if(greetings[i].indexOf('Christmas') !== -1) {
    var result = input;
    var listItem = document.createElement('li');
    listItem.textContent = result;
    list.appendChild(listItem);
  }
}
```

### 数字与字符串
#### 相互转换
非常神奇, 在JS当中, 数字和字符串可以直接通过函数`Number()`和`String()`进行转换, 与C语言不同.
```js
const myString = "123";
const myNum = Number(myString);
console.log(typeof myNum);
// number
console.log(myNum);
// 123
```

```js
const myNum2 = 123;
const myString2 = String(myNum2);
console.log(typeof myString2);
// string
console.log(myString2);
// "123"
```
> 对于浮点数同样成立.

#### 前后拼接
使用`+`将字符串类型和数字类型的变量or常量直接拼接, 得到的是以空格相隔的字符串:
```js
const name = "Front ";
const number = 242;
const combine = name + number;

console.log(combine); //Front 242

console.log(typeof(combine));  //string
```

### 数组
1. 存储任意类型元素--字符串，数字，对象，变量，**另一个数组**;
2. 可以 **混合** 元素类型:
```js
let random = ["tree", 795, [0, 1, 2]];
```
3. 像访问字符串一样, 利用索引访问数组元素;
4. $\underline{多维数组}$ 包含数组的数组结构称为~

#### split()
- 作用: 将一个字符串根据给定的字符分隔为字符串数组;
```js
let myData = "Manchester,London,Liverpool,Birmingham,Leeds,Carlisle";
let myArray = myData.split(",");
console.log(myArray);
 // ["Manchester", "London", "Liverpool", "Birmingham", "Leeds", "Carlisle"]
```

#### join()
`split`的反向操作, 给出分隔符号, 将数组的字符串拼接成一个字符串:
```js
let myNewString = myArray.join(",");
myNewString;
```

#### toString()
与`join`方法相似, 但是无法自定义分隔符, 默认为`,`:
```js
let dogNames = ["Rocket", "Flash", "Bella", "Slugger"];
dogNames.toString(); //Rocket,Flash,Bella,Slugger
```

#### push & pop
`push()`方法可以将1或多个元素添加到数组的 **末尾**:
1. 将会直接改写原来的数组,不需要重新赋值;
2. 该方法具有返回值, 且返回的是更新之后的数组长度(包含元素的个数);
```js
let myArray = [1, 2, 3];
let newLength = myArray.push(4, 5,"string");
console.log(myArray); // [1, 2, 3, 4, 5, "string"]
console.log(newLength); // 6
```

使用`.pop()`从数组中删除最后一个元素:
```js
myArray.pop(); //"string"
console.log(myArray); // [1, 2, 3, 4, 5]
```
1. 方法调用返回值就是删除的元素本身;
2. 直接对原始数组操作并赋值, 不需要另外的赋值操作;

> shift & unshift:
> 在功能上分别与`push`和`pop`相同, 但是作用于数组的开始位置.

## 条件语句
JS的条件语句与C语言十分相似, 在此仅给出官方文档的一些例子:
### 天气预报
```html
<label for="weather">选择今天的天气：</label
><select id="weather">
  <option value="">--作出选择--</option>
  <option value="sunny">晴天</option>
  <option value="rainy">雨天</option>
  <option value="snowing">雪天</option>
  <option value="overcast">阴天</option>
</select>

<p></p>
```
> `lable`当中的`for`标签与`select`标签的`id`属性对应, 用于关联两个标签.

```js
const select = document.querySelector("select");
const para = document.querySelector("p");

select.addEventListener("change", setWeather);

function setWeather() {
  const choice = select.value;

  switch (choice) {
    case "sunny":
      para.textContent = "阳光明媚。穿上短裤吧！去海滩，或公园，吃个冰淇淋。";
      break;
    case "rainy":
      para.textContent = "外面下着雨；带上雨衣和雨伞，不要在外面呆太久。";
      break;
    case "snowing":
      para.textContent =
        "大雪纷飞，天寒地冻！最好呆在家里喝杯热巧克力，或者去堆个雪人。";
      break;
    case "overcast":
      para.textContent =
        "虽然没有下雨，但天空灰蒙蒙的，随时都可能变天，所以要带一件雨衣以防万一。";
      break;
    default:
      para.textContent = "";
  }
}
```
> 1. 通过`querySelector`方法获取`select`和`p`标签;
> 2. 然后为`select`标签添加事件监听器, 当内容改变时触发 **change** 事件, 同时调用`setWeather`函数;
> 3. 进而通过 **switch** 语句处理不同天气的情况, 并设置相应的文字内容;
> 在线网页示例:[simple-switch](https://mdn.github.io/learning-area/javascript/building-blocks/simple-switch.html)

