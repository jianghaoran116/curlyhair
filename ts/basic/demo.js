// const getNumber: () => number = () => {
//   return 123;
// }
// // ----------------------- 数组 ----------------------
// // 存储基本类型
// const list: (string | number)[] = [1, 2, 3, '4'];
// // 存储对象类型
// const list1: { name: string }[] = [{ name: 'joge' }];
// // 类型别名 alias
// type person = { name: string }
// const list2: (person)[] = [{ name: 'joge' }];
// class Teacher {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }
// const list3: (Teacher)[] = [{ name: 'joge' }, new Teacher('joge1')];
// // ----------------------- 元组 tuple ----------------------
// // 比如csv
// const list4: [string, string, number] = ['joge', 'joge1', 1];
// // ----------------------- interface ----------------------
// // 只能代表对象或函数 不能代表基本类型
// interface Person {
//   name: string,
//   age?: number,
//   [propName: string]: any, // 任意的其他属性
//   say(): string, // say方法
// }
// class User implements Person {
//   name = 'user';
//   say() {
//     return this.name;
//   }
// }
// // 接口之间相互继承
// class Person {
//   constructor(public name: string) {}
// }
// class Teacher extends Person {
//   constructor(public age: number) {
//     super('dell');
//   }
// }
// const teacher = new Teacher(28);
// console.log(teacher.age);
// console.log(teacher.name);
// class Person {
//   constructor(private _name: string) {}
//   get name() {
//     return this._name + ' lee';
//   }
//   set name(name: string) {
//     const realName = name.split(' ')[0];
//     this._name = realName;
//   }
// }
// const person = new Person('dell');
// console.log(person.name);
// person.name = 'dell lee';
// console.log(person.name);
var Demo = /** @class */ (function () {
    function Demo(name) {
        this.name = name;
    }
    Demo.getInstance = function () {
        if (!this.instance) {
            this.instance = new Demo('dell lee');
        }
        return this.instance;
    };
    return Demo;
}());
var demo1 = Demo.getInstance();
var demo2 = Demo.getInstance();
console.log(demo1.name);
console.log(demo2.name);
