// 任意类型
// 普通类型，在复制过程中改变类型不被允许
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;

// 用any类型，则允许
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

// 类型推论（type inference）
let myFavoriteString = 'rey';
myFavoriteString = 8;
// 此时编译会报错 index.ts:14:1 - error TS2322: Type '8' is not assignable to type 'string'.
// 以上其实等价于
// let myFavoriteString: string = 'rey';
// myFavoriteString = 8;

// 如果定义时没有赋值，不管之后有没有赋值，会被推断为任意值(any)类型
// let something; => let something: any;

// 联合类型（Union Types）
let myFavoriteNumber2: string | number;
myFavoriteNumber2 = 'eight';
myFavoriteNumber2 = 8;

// 当Typescript不确定一个联合类型的变量到底是哪个类型时，只能访问联合类型的所有类型的共有属性或方法
function getLength(something: string | number): number {
  return something.length;
}
// index.ts:30:20 - error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// 但以下访问共有属性不会报错
function getLength2(something: string | number): string {
  return something.toString();
}

// 对象类型-接口
// 接口不仅可以对类进行抽象，还可以对 对象的形状(Shape)进行描述
// 接口首字母大写
// 在没有使用可选属性、任意属性时，定义的变量比接口少属性或多属性都是不允许，如下，把age去了或者添加别的属性都会报错
// 因此变量的形状必须和接口的形状保持一致
interface Person {
  name: string;
  age: number;
}

let rey: Person = {
  name: 'rey',
  age: 26
};

// 定义可选属性，在对应属性名中添加?
// 但任然不允许添加未定义的属性
interface Person2 {
  name: string;
  age?: number;
}

let rey2: Person2 = {
  name: 'rey'
};

// 定义任意属性
// 用[propName: string]定义了任意属性取string类型的值
interface Person3 {
  name: string;
  age?: number;
  [propName: string]: any;
}

let rey3: Person3 = {
  name: 'rey',
  gender: 'male'
};

// 一旦定义了任意属性，那么确定属性必须是可选属性的子属性
interface Person4 {
  name: string;
  age?: number;
  [propName: string]: string;
}
// index.ts:81:3 - error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// 该例中，任意属性的值允许是string，但可选属性age的值是number，所以报错
let rey4: Person4 = {
  name: 'rey',
  age: 26,
  gender: 'male'
};

// 只读属性 只能在创建的时候被赋值
interface Person5 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let rey5: Person5 = {
  id: 111,
  name: 'rey',
  age: 26,
  gender: 'male'
};

// 数组类型
// 第一种表达方式：[类型+方括号]
let fibonacci: number[] = [1, 1, 2, 3, 5];
// 数组项中不允许出现其他的类型，如下，类型被推断为(number | string)[]
// let fibonacci: number[] = [1, '1', 2, 3, 5];
// 数组的方法参数也会根据数组在定义时约定的类型进行限制
// fibonacci.push('8') 报异常

// 第二种表达方式：数组泛型
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];

// 第三种表达方式：用接口表示数组
interface NumberArray {
  [index: number]: number;
}

let fibonacci3: NumberArray = [1, 1, 2, 3, 5];

// any在数组中的应用
let list: any[] = ['Rey Shieh', 26, { website: 'http://reyshieh.com' }];

// 类数组，比如arguments
// function sum() {
//   let args: number[] = arguments;
// }
// index.ts:130:7 - error TS2322: Type 'IArguments' is not assignable to type 'number[]'.
//   Property 'pop' is missing in type 'IArguments'.
// 以上的类数组定义会报错，常见的类数组都有自己的接口定义，如IArguments，NodeList，HTMLCollection等
function sum() {
  let args: IArguments = arguments;
}

// 函数的类型
function sum2(x: number, y: number): number {
  return x + y;
}
// 输入多余(或者少于要求)的参数是不背允许的
sum2(1, 2, 3);

// 函数表达式
let sum3 = function (x: number, y: number): number {
  return x + y;
}
// 以上的右侧匿名函数进行了类型定义，但等号左边sum3，是通过赋值操作进行类型推断出来的。
// 实际手动添加类型：
// let sum3: (x: number, y: number) => number = function (x: number, y: number): number {
//   return x + y;
// }

// typescript中的=>代表函数的定义，左边是输入类型，需要括号起来，右边是输出类型

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}

// 定义可选参数 与接口中的可选属性类似，也用?表示可选的参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
// 可选参数必须放在必须参数后面

// 可以给函数参加默认值
function buildName2(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
// 当有默认值的时,就不受可选参数必须接在参数后面的限制

// 剩余参数 ...rest的方式获取函数中的剩余参数
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}

// 重载 重复定义多次函数，前几个都是函数定义，最后一个是函数实现。
// typescript会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

// 类型断言(type assertion)
// function getLength(something: string | number): number {
//   return something.length;
// }
// 以上因为类型不确定，所以不能调不通用的方法或属性
// 但是还是想在不确定类型的时候就想访问类型或方法，可以
function getLength2(something: string | number): number {
  if (something.length) {
    return something.length;
  } else {
    return something.toString().length;
  }
}
// index.ts:212:17 - error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// 212   if (something.length) {                   ~~~~~~
// index.ts:213:22 - error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// 213     return something.length;
// 可以使用类型断言，将something断言为string：
function getLength3(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
// 类型断言的用法是在需要断言的变量前加上<Type>即可
// 断言类型不是类型转换，断言成一个联合类型中不存在的类型时不允许的
function toBoolean(something: string | number): boolean {
  return <boolean>something;
}
// error TS2352: Conversion of type 'string | number' to type 'boolean' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
//   Type 'number' is not comparable to type 'boolean'.

// 声明语句
// 在Typescript中，使用第三方库，比如jQuery，需使用declare关键字来定义类型，帮助TypeScript判断传入的参数类型对不对
declare var jQuery: (selector: string) => any;
jQuery('#foo');
// declare定义的类型只会用于编译时的检查，编译结果会被删除

// 声明文件
// https://github.com/DefinitelyTyped/DefinitelyTyped 存放所有第三方的定义文件
// 通常会把类型声明放到一个单独的文件中，通常约定声明文件以.d.ts为后缀
// jQuery.d.ts
// declare var jQuery: (string) => any;
// 然后在使用到的文件的开头，用[三斜线指令]表示引用了声明文件：
/// <reference path="./jQuery.d.ts" />
jQuery('#foo');

// 内置对象 
// Javascript的所有内置对象 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
// 这些内置对象在Typescript中对应的定义文件 https://github.com/Microsoft/TypeScript/tree/master/src/lib
// 内置对象是指根据标准（ECMAScript和其他环境如DOM）全局作用域（Global）上存在的对象。
// ECMAScript标准提供的内置对象：Boolean、Error、Date、RegExp等
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// DOM和BOM的内置对象：Document、HTMLElement、Event、NodeList等
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do Something
});
