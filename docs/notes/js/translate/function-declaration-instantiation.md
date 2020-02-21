# 函数声明的实例化
函数的执行上下文建立后会生成一条新的函数环境记录，并且实例化形参的绑定。函数体声明也会被实例化。如果函数的形参没有默认值，那函数体声明同形参实例化在一个函数环境记录。如果形参有默认值，那么会为函数体新建一个新的环境记录。形参和函数的初始化是作为函数声明实例化的一部分。所有其他绑定的初始化是在函数体的执行过程中。