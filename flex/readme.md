# Flex 用法及属性详细记录

参考：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout

**一维布局**，二维对应 grid

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

元素布局参考：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax

# **css属性：**

- flex: 简写，flex-grow,flex-shrink,flex-basis
- flex-flow 简写，flex-direction,flex-wrap
- flex-wrap 换行规则
- flex-basis 元素分配空间基准
- flex-grow 元素增长规则
- order 视觉排序
- flex-direction（主轴方向）
- flex-shrink 元素缩放规则

# **对齐属性**

- align-content 多行情况空间分配
- align-items 子项目在交叉轴上的对齐方式
- align-self 元素自身在交叉轴上的对齐方式
- justify-content 子项目主轴对齐方式
- place-content，align-content和justify-content 的简写
- column-gap 列间隔 严重不兼容 2020.03.05
- row-gap 行间隔 严重不兼容
- gap 简写 row-gap,column-gap

# 元素属性

* flex-grow 元素扩展
* flex-shrink 元素收缩
* flex-basis 扩展或收缩基准

# **相关术语**

- 弹性盒子（Flexbox）
- 伸缩容器（Flex Container）
- 弹性项目（Flex Item）
- 主轴（Main Axis）
- 交叉轴（Cross Axis）
- 伸缩性（Flex）

# 详细

## 分主轴和交叉轴

主轴 由flex-direction 定义，交叉轴垂直于主轴。默认 row，inline 排列，column 则是block排列。

交叉轴始终垂直于主轴。

## **起始线和终止线**

和text-align 不同描述排列方式不再使用 左右 ，而是采用起点和终点的概念来描述，因为不同国家的语言排列方向是不同的，剥离了左右的概念后，可以根据语言排列方向自动适配。

## 换行

通过flex-wrap :wrap 实现多行排列。

flex-flow 弹性流，两个参数分别为flex-direction 和 flex-wrap 缩写。



## 元素间的对齐和空间分配

order： 主轴上的排序，默认0

align-content: **多行下**，沿主轴的空间分配

## 可分配空间概念

### 正负空闲空间

当元素没有撑满容器时，存在的剩余空间是正空闲空间（positive free space）

当元素溢出容器时，超出的空间是负空闲空间（negative free space）

**没有positive free space 时不增长，没有negative free space 不会缩放。**

## 元素自身属性

自身的大小：flex-basis (基础)，默认auto 自身内容的大小

延展的比例：flex-grow，0不做增长，为1 的元素会平分可用空间，也可以按比例在所有grow值中做分配。

收缩的比例：flex-shrink，0不做缩放，超出主轴生效，在basis基础上按占用总shrink值的比例做缩放。

元素的扩展和收缩均是根据basis 来做计算