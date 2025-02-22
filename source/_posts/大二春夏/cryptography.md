---
title: cryptography
date: 2025-02-19 20:11:12
tags:
categories:
excerpt: 密码学相关
math: true
---

# 数学基础
概念回顾:
- **素数相关定理** :任何正整数都能分解为素数的乘积.


- **互素** 若a,b的最大公因数为1, 则称a,b互素.
- 最大公约数 gcd
- 整除
  - a 整除 b记做 `a | b` 


若`gcd(a,b) = d`, 且a,b至少1个不为0, 则:
- 内容: `a*x + b*y = gcd(a,b) = d`;
- 证明: 利用欧几里得法辅助证明
	- 欧几里得法求解gcd: 每次将除数作为被除数, 余数作为除数, 最后得到的除数(余数为0时)就是gcd;
	- a,b都可以分解为 对应的分解形式(初始的`x`,`y`分别设为`0`);
	- 之后的除数都可以通过减法得到, 所以最后的除数也符合条件
- 推广:
	- 当`gcd(a,b) = 1`时, `a*x + b*y = 1`.


## 模运算和同余
回顾基本的模运算:
**1. 加法规则:**
	`(a+b) mod n = (a mod n + b mod n) mod n`
**2. 减法规则:**
	`(a-b) mod n = (a mod n - b mod n **+ n**) mod n`
> `+n`以避免得到负数的结果.

**3. 乘法规则:**
	`(a*b) mod n = (a mod n * b mod n) mod n`

a,b,n均为整数且 $n \neq 0$, 下面几种说法等价:
- $a = b + n \cdot k$, 其中 k 为整数;
- a,b对于模n同余;
- $a \equiv b \pmod n$, 即 $a \% n = b \% n$.

---

**相关性质:**
- 当且仅当`n | a`时有 $a \equiv 0 \pmod n$
- 当且仅当 $b \equiv a \pmod n$ 时有 $a \equiv b \pmod n$
- 若$a \equiv b \pmod n$ 且 $b \equiv c \pmod n$, 则 $a \equiv c \pmod n$
- 如果a,b与c,d分别对于模n同余, 则 
  - $a + c \equiv b + d \pmod n$
  - $a - c \equiv b - d \pmod n$
  - $a \cdot c \equiv b \cdot d \pmod n$

## 逆元
### 加法模逆元
如果 $a+b \equiv \pmod n$ , 则称a为b的加法模n逆元, b也为a的加法模n逆元.

e.g: 恺撒加密中 `+3`与`+23`互为加法模26的逆元. 在解密时, 由于`-3`与`+23`等价, 所以采用`+23`的方式解密.


### 乘法模逆元
如果 $a \cdot b \equiv 1 \pmod n$, 则称a为b的乘法模n逆元, b也为a的乘法模n逆元.

此时存在整数k满足: $a\cdot b - 1 = n\cdot k$.


e.g: 利用扩展欧几里得法求解乘法逆元
> TODO

**Notice:** 
$\gcd (a,b)$ = 1 $\Leftrightarrow$ a在模b下存在乘法逆元, 即 $a \cdot k \equiv 1 \pmod b$
- 充分性证明: 
  - 前者推出 $\exist \ x,y$ 满足 $a\cdot x + b\cdot y = 1$;
  - 移项得到 $a\cdot x = 1 - b\cdot y$, 即满足后者的形式;
- 必要性证明: 
  - 后者由上述乘法模逆元的定义可知 $\exist \ n$, 使得$a\cdot k - 1 = n\cdot b$ 成立;
  - 变换得到: $a\cdot k - n\cdot b = 1$, 根据裴蜀定理得到 $\gcd (a,b) = 1$.

## 加密算法
### ase
- 将明文`p`作为输入, 得到一个检验值`crc`, 同时将`p`在某种加密算法下加密得到`p'`.
- 将`p’`与`crc`保存在加密之后的文件当中.
- 解密时, 将给出的密码作为输入, 由给定的解密函数得到`p''`, 然后由`p''`得到对应的检验值`crc’`;
- 判断前后的检验值是否相同, 如果相同, 说明输入的密码正确, 解密得到的`p''`就是`p’. 否则说明密码错误.

### ecc
椭圆曲线加密算法

### rsa
