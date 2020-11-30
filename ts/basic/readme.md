# 静态类型  
具备相应静态类型的属性和方法 可以给出提示  

# 基础类型  
boolean, number, string, void, undfined, symbol, null
# 对象类型(复杂对象)  
object array  
# 类型注解  
我们告诉TS变量是什么类型  
# 类型推断  
TS自动尝试推断变量的类型  


# 数组  

# 类  
访问类型  
- pubilc  
  类内和类外都可以被调用  
- private  
  可以在类内调用  
- protected  

# 联合类型和类型保护  
- 类型断言 as  
  ``` javascript  
  if (xxx.props) {
    animal as xxx
  }
  ```  
- if xxx in ccc  
  ccc.xxx