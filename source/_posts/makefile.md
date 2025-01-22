---
title: makefile
date: 2025-01-22 13:45:47
tags:
categories:
excerpt: 111
mermaid: true
---
makefile 定义了一系列规则来指定优先编译、 重新编译的文件, 并服务于其他更复杂的操作.


```mermaid
graph TD
  A[源代码 (.c)] --> B[预处理]
  B --> C[预处理后的代码 (.i)]
  C --> D[编译]
  D --> E[汇编代码 (.s)]
  E --> F[汇编]
  F --> G[目标文件 (.o)]
  G --> H[链接]
  H --> I[可执行文件]
  
  subgraph 编译过程
    B --> C
    C --> D
    D --> E
    E --> F
  end
  subgraph 链接过程
    G --> H
    H --> I
  end
```

