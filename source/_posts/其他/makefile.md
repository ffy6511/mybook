---
title: makefile
date: 2025-02-12 18:15:25
tags:
categories:
excerpt: 一起来学习makefile吧！
---
# 基本概念
## 默认目标
- `Makefile`当中的第一个目标会成为**默认目标**;
- 不指定参数的`make`命令会执行默认目标;
- 通常使用`all`的伪目标作为默认目标.

## 伪目标
当我们需要执行清理工作、运行测试等操作时, 我们不希望与实际文件名发生冲突, 此时就需要用到 **伪目标**.

**语法**
```makefile
.PHONY: 目标名
目标名:
    命令
```

**使用示例**
```makefile
# 情景：需要清理编译产生的 .o 文件和可执行文件
.PHONY: clean
clean:
    rm -f *.o program

# 情景：需要运行测试
.PHONY: test
test:
    ./run_tests.sh

# 使用方法：
# make clean  # 清理文件
# make test   # 运行测试
```
> 其中`-f`表示强制删除, 其他的参数如`-r`表示递归删除目录, `-rf`表示强制递归删除目录.

### 多重构建
我们还可以利用伪目标使得默认目标具有多个对象:
```makefile 
.PHONY: all debug release clean

# 默认目标包含常用的构建类型
all: debug release

# 调试版本
debug: main.c
    @echo "构建调试版本..."
    gcc -g main.c -o debug-program

# 发布版本
release: main.c
    @echo "构建发布版本..."
    gcc -O2 main.c -o release-program

clean:
    rm -f debug-program release-program

# 使用：
# make          # 构建调试版和发布版
# make debug    # 只构建调试版
# make release  # 只构建发布版
# make clean    # 清理
```




## 基本规则
```makefile
target ... : prerequisites ...
    recipe
    ...
    ...
```
`target`: 目标文件 | 可执行文件 | 标签;
`prerequisites`: 依赖文件 | `target`;
`recipe`: 对应`target`所需的命令(以`Tap`缩进开头).

<br>

执行`recipe`命令的条件:
- `prerequisites`中存在文件的日期早于`target`的日期;
- `target`的文件不存在.

## 使用变量
```makefile
# 定义变量: 类似于C的宏定义
objects = main.o display.o

# 使用变量
edit: $(objects)
    cc -o edit $(objects)
```
1. 必须使用`Tab`缩进;
2. 采取`$(variable)`的形式引用变量, 将会展开为变量的值;
3. `cc -o edit` 声明采用C语言编译器同时指定输出文件名为`edit`.

## Make的自动推导
### 自动推导规则
1. **文件关联**：
   - 当make看到`.o`文件时，会自动将对应的`.c`文件加入依赖关系
   - 例如：发现`whatever.o`时，会自动关联`whatever.c`作为依赖文件

2. **命令推导**：
   - 自动推导编译命令，如`cc -c whatever.c`
   - 无需在每个`.o`文件后都手动写编译命令

### 示例结构

- **依赖关系**：
```makefile
# 自动推导之前
main.o : main.c defs.h
    cc -c main.c

# 自动推导下的简化书写
main.o : defs.h
```

- **清理目标**：
```makefile
.PHONY : clean
clean :
    rm edit $(objects)
```

- `.PHONY`表示`clean`是伪目标文件;
- 这种自动推导方式大大简化了Makefile的编写;
- `clean`总是放在文件的末尾.



`make`命令在默认情况下会在当前目录下**依次**寻找文件名为`GNUmakefile`,`makefile`,`Makefile`的文件.
- 推荐使用`Makefile`作为文件名;
- 也可以使用`-f`或者`-file`参数来指定特定的`Makefile`文件.
```shell
make -f Make.Linux
```




## include命令
```makefile
# 使用include命令可以将其他Makefile包含进来
include <file-name>
```
- `include`命令前可以存在空字符, 但是不能为`Tab`缩进;
- `include`与文件之间可以存在多个空格.


### 直接指定文件
```makefile
# 最基本的include用法是直接指定文件名
include config.mk
include ./build/rules.mk

# 同时包含多个文件
include config.mk rules.mk tests.mk
```

### 使用通配符 *
```makefile
# * 匹配任意字符串
include *.mk              # 包含当前目录下所有.mk文件
include src/*.mk         # 包含src目录下的所有.mk文件
include **/build/*.mk    # 包含任意子目录中build目录下的所有.mk文件
```

我们同样可以在变量中使用通配符 `*`:
```makefile
# 使用时展开
objects = *.o

# 定义时展开(除非重新赋值, 否则保持定义时的展开状态)
objects := $(wildcard *.o)
```


### 使用单字符通配符
```makefile
# ? 匹配单个字符
include test?.mk         # 匹配test1.mk, testA.mk等
include rule_?.mk        # 匹配rule_1.mk, rule_2.mk等
include config???.mk     # 匹配config后带三个字符的.mk文件
```

### 使用目录路径
```makefile
# 可以指定不同的目录路径
include ./configs/*.mk    # 当前目录下的configs子目录
include ../shared/*.mk    # 上级目录的shared子目录
include /usr/local/include/make/*.mk  # 绝对路径
```

### 使用字符集[]
```makefile
# [] 用于匹配字符集中的任意一个字符
include make[123].mk     # 匹配make1.mk, make2.mk, make3.mk
include test[a-z].mk     # 匹配testa.mk到testz.mk
include config[0-9].mk   # 匹配config0.mk到config9.mk
```

### 错误处理
```makefile
# 默认情况下，如果include的文件不存在，make会报错

# 使用-include或sinclude可以忽略文件不存在的错误
-include optional.mk     # 如果文件不存在，继续执行不报错
sinclude optional.mk     # 与-include完全相同

# 多个可选文件
-include config/*.mk     # 如果config目录下有任何.mk文件不存在，继续执行
```

### 组合使用示例
```makefile
# 可以组合使用多种模式
include config.mk \
        rules/*.mk \
        test[0-9].mk \
        ./build/**/*.mk

# 使用变量
INCLUDE_DIR = ./includes
include $(INCLUDE_DIR)/*.mk

# 条件包含
ifdef CUSTOM_RULES
    include $(CUSTOM_RULES)
endif
```

## make的工作方式
1. 读取所有的`Makefile`;
2. 读取`include`涉及的`Makefile`文件;
3. 初始化文件当中的**变量**;
4. 推导**隐式规则**并分析所有规则;
5. 为目标文件创建依赖关系链;
6. 根据依赖关系, 决定需要重新生成的文件;
7. 执行生成命令.


## 文件搜寻
### VPATH
默认情况下, `make`会在当前目录和所有子目录下寻找依赖文件和目标文件. 
为了能够在较大工程中扩大`make`的搜索范围, 我们可以通过特殊变量`VPATH`来指定搜索路径.


```makefile
VPATH = src:../headers
```
1. 不同的目录之间由`:`分隔, 上述定义指定了额外的`src`以及`../headers`目录;
2. 当前目录的优先级最高, 在当前目录下无法找到相关文件时将会从指定的目录中**从左到右**继续寻找.

### vpath
上述的`VPATH`指定了全局文件的搜索路径, 而`vpath`允许为**不同类型**的文件指定不同的搜索路径.

**语法**
```makefile
# 1. 为指定模式的文件设置搜索路径
vpath pattern directory1:directory2

# 2. 清除指定模式的搜索路径
vpath pattern

# 3. 清除所有已设置的 vpath
vpath
```

**特点**
- 可以为不同类型的文件指定不同的搜索路径;
- 支持使用 `%` 通配符匹配文件名;
- 可以有多条 vpath 指令, 且针对相同模式的命令将会起到**附加**而非覆盖的作用.


**e.g.**
```makefile
# 定义编译器
CC = gcc

vpath %.h include
vpath %.c src
vpath %.o build
vpath %.a lib

program: main.o utils.o
    $(CC) -o program main.o utils.o -L. -lmylib

main.o: main.c project.h
    $(CC) -c main.c

utils.o: utils.c utils.h
    $(CC) -c utils.c
```

---

`vpath`的指令必须都写在`Makefile`当中, 在`Make`解析`Makefile`文件时被处理, 例如:
```makefile
# 如果需要清理 .o 文件的搜索路径并重新设置
clean-paths:
	# 清除 .o 文件的搜索路径
	vpath %.o
	# 设置新的搜索路径
	vpath %.o new/build

# 如果需要完全重置所有搜索路径
reset-paths:
	# 清除所有 vpath 设置
	vpath
	# 重新设置所需的搜索路径
	vpath %.h include
	vpath %.c src
	vpath %.o build
```
在终端中对应的指令:
```shell
$ make              # 使用默认搜索路径编译
$ make clean-paths  # 执行搜索路径清理和重设
$ make reset-paths  # 重置所有搜索路径
```

---

**优先级**: 当前目录 > `vpath` > `VPATH`. 


