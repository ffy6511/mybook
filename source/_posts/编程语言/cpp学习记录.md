---
title: cpp学习记录
date: 2025-02-14 20:21:21
tags:
categories:
excerpt: 一起来学习cpp
math: true
---

编译时, 从`c`的`gcc`转变为了`g++`.

# 输入输出流
通过包含头文件 -- `#include <iostream>` 来使用输入输出流 `cin` 和 `cout`.

```cpp
#include <iostream>

using namespace std;
int main(){
    int age; 
    cin >> age;
    cout << "You are " << age << " years old" << endl;
    // endl 是换行符
    return 0;
}
```

# 变量
## String
需要先引入指定的头文件:
```cpp
#include <string>
```

- 定义时可以使用等号或者用括号包裹字符串:
```cpp
string name = "John"; 
// string name("John");
```

---

### stringstream
`stringstream` 表示**双向**字符串流:
- 需要导入头文件`#include <sstream>`;
- `istringstream` 表示**输入**字符串流, `ostringstream` 表示**输出**字符串流.

#### 字符串分词
自动以**空白字符**(空格、制表符\t、换行符\n等)分割字符串;

```cpp
#include <string>
#include <iostream>
#include <sstream>

using namespace std;
int main(){
    string name ( "Xiao Ming");

    // 使用括号包字符串
    istringstream is (name); 
    string s;
    while (is>>s){
        cout << s << endl;
    }
}
```
> `>>` 表示从输入流中读取数据.

Output:
```shell
Xiao Ming
Xiao
Ming
```

包含更多分词的字符串:
```cpp
#include <string>
#include <iostream>
#include <sstream>

using namespace std;
int main(){
    string words = "hello \n world! \t I am \n here!";
    stringstream is (words);
    
    string word;
    int count  = 1;
    while(is >> word){
        cout << "Word " << count << ": " << word << endl;
        count++;
    }
}
```
Output:
```shell
Word 1: hello
Word 2: world!
Word 3: I
Word 4: am
Word 5: here!
```

#### 字符串拼接
```cpp
#include <sstream>
#include <string>
#include <iostream>

using namespace std;

int main() {
    ostringstream oss;
    string name = "Alice";
    int age = 25;
    
    oss << "Name: " << name << ", Age: " << age;
    string result = oss.str();
    cout << result << endl;
}
```
Output:
```shell
Name: Alice, Age: 25
```
> 通过`.str()`方法可以对象转换为字符串类型, 从而**格式化输出**.

<br>

`.str("")`方法可以**清空**字符串流:
```cpp
#include <sstream>
#include <string>
#include <iostream>

using namespace std;

int main() {
    ostringstream oss;
    string name = "Alice";
    int age = 25;
    
    oss << "Name: " << name << ", Age: " << age;
    oss.str("");
    string result = oss.str();
    cout << result << "Nothing" << endl;
}
```
Output:
```shell
Nothing
```

### Getline
**基本语法:**
```cpp
getline(istream& is, string& str, char delim = '\n');
```
- `is`: 输入流（通常是cin;
- `str`: 存储结果的字符串;
- `delim`: 分隔符, 默认为换行符`\n`.

**Example**:
```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {
    string line;
    
    cout << "请输入一行文本：";
    getline(cin, line);  // 读取整行，包括空格
    cout << "你输入的是：" << line << endl;
    
    // 使用自定义分隔符
    string data;
    cout << "请输入内容（用,分隔）：";
    getline(cin, data, ',');  // 读取直到遇到逗号
    cout << "读取到逗号前的内容：" << data << endl;
}
```

### cin
**特点**:
- 以空白字符（空格、制表符、换行符）为分隔符;
- **忽略**前导空白字符;
- 遇到空白字符就停止读取.


通常需要与`getchar()`方法配合来清除缓冲区当中的`\n`字符:
```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {
    int number;
    string line;
    
    cout << "输入一个数字：";
    cin >> number;
    
    //清除输入缓冲区中的换行符
    getchar(); // or cin.ignore(); 
   
    cout << "输入一行文本：";
    getline(cin, line);  // 现在可以正确读取整行
    
    cout << "数字：" << number << endl;
    cout << "文本：" << line << endl;
}
```
> 如果输入`8 \n`, 则`getchar()`读取空格, 文本为空.

## 字符串方法
### append
```cpp
// 添加整个字符串
string1.append(string2);

// 添加指定位置的字符(索引从开始)
string1.append(string2, start, length);

// 重复字符的添加
string1.append(count, char);

```

除此之外, 还存在着使用$\underline{迭代器}$的用法: 
> 类似于指针, 指向容器(如字符串、数组等)的特定位置.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string source = "World!";
    string target = "Hello ";
    
    // 添加source中的部分字符（从开始到结束）
    target.append(source.begin(), source.end());
    cout << target << endl;  // 输出: Hello World!
    
    // 只添加部分字符
    string target2 = "Hello ";
    target2.append(source.begin(), source.begin() + 5);  // 只添加"World"，不包含"!"
    cout << target2 << endl;  // 输出: Hello World
    
    return 0;
}
```
1. `begin()`方法返回字符串的第一个字符的迭代器, `end()`方法返回字符串最后一个字符的**下一个**位置的迭代器;
2. 迭代器的范围是**左闭右开**.
