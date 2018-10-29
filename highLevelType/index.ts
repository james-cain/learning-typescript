// 类型别名  类型别名用来给一个类型起新名字
// 常用于联合类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}

// 字符串字面量类型 约束取值只能是某几个字符串中的一个
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event中没有dbclick

// 类型别名与字符串字面量类型都是使用type进行定义

// 元组（Tuple） 元组合并了不同类型的对象
// 如，定义一对值分别为string和number的元组
let reyshieh: [string, number];
reyshieh[0] = 'rey';
reyshieh[1] = 26;

reyshieh[0].slice(1);
reyshieh[1].toFixed(2);

// 只赋值其中一项：
reyshieh[0] = 'shieh';

// 越界的元素
// 当添加越界的元素时，类型会被限制为元组中每个类型的联合类型
let reyshieh1: [string, number];
reyshieh1 = ['rey', 26];
reyshieh1.push('http://reyshieh.com/');
reyshieh1.push(true);
// index.ts:42:16 - error TS2345: Argument of type 'true' is not assignable to parameter of type 'string | number'.

// 枚举（Enum）用于取值被限定在一定范围内的场景
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 枚举成员被赋值为从0开始递增的数字，同时也会对枚举值进行反向映射
console.log(Days['Sun'] === 0); // true
console.log(Days[0] === 'sun'); // true
// 枚举型会被编译为
// var Days;
// (function (Days) {
//     Days[Days["Sun"] = 0] = "Sun";
//     Days[Days["Mon"] = 1] = "Mon";
//     Days[Days["Tue"] = 2] = "Tue";
//     Days[Days["Wed"] = 3] = "Wed";
//     Days[Days["Thu"] = 4] = "Thu";
//     Days[Days["Fri"] = 5] = "Fri";
//     Days[Days["Sat"] = 6] = "Sat";
// })(Days || (Days = {}));

// 手动赋值
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
// 未手动赋值的枚举项会接着上一个枚举项递增

enum Days3 {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript是不会察觉到这一点
console.log(Days['Sun'] === 3); // true
console.log(Days['Wed'] === 3); // true
console.log(Days[3] === 'Sun'); // false
console.log(Days[3] === 'Wed'); // true
// 递增到3的时候与前面的Sun的取值重复了，但TypeScript并没有吧奥错，导致Days[3]的值先是“sun”，而后又被“Wed”覆盖，编译结果为
// var Days3;
// (function (Days3) {
//     Days3[Days3["Sun"] = 3] = "Sun";
//     Days3[Days3["Mon"] = 1] = "Mon";
//     Days3[Days3["Tue"] = 2] = "Tue";
//     Days3[Days3["Wed"] = 3] = "Wed";
//     Days3[Days3["Thu"] = 4] = "Thu";
//     Days3[Days3["Fri"] = 5] = "Fri";
//     Days3[Days3["Sat"] = 6] = "Sat";
// })(Days3 || (Days3 = {}));

// 手动赋值的枚举可以不是数字，但是需要使用类型断言来让tsc无视类型检查（编译出的js仍然是可用的）
enum Days4 { Sun = 7, Mon, Wed, Thu, Fri, Sat = <any>"S"};
// var Days4;
// (function (Days4) {
//     Days4[Days4["Sun"] = 7] = "Sun";
//     Days4[Days4["Mon"] = 8] = "Mon";
//     Days4[Days4["Wed"] = 9] = "Wed";
//     Days4[Days4["Thu"] = 10] = "Thu";
//     Days4[Days4["Fri"] = 11] = "Fri";
//     Days4[Days4["Sat"] = "S"] = "Sat";
// })(Days4 || (Days4 = {}));

// 手动赋值的枚举项也可以小数或者负数，此时后续未手动赋值的项的递增步长仍为1
enum Days5 { Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
console.log(Days5["Sun"] === 7); // true
console.log(Days5["Mon"] === 1.5); // true
console.log(Days5["Tue"] === 2.5); // true

// 枚举项可以是常数项和计算所得项
// 但是计算所得项后面不能放未手动赋值的项，否则会因为无法获得初始值而报错
// 不会报错的情况：
enum Color { Red, Green, Blue = "blue".length };
// 会报错的情况：
enum Color2 { Red = "red".length, Green, Blue };
// index.ts:107:35 - error TS1061: Enum member must have initializer.
// index.ts:107:42 - error TS1061: Enum member must have initializer.

// 常数枚举 使用const enum 定义的枚举类型
// 常数枚举和普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 编译后的结果：
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 如果包含计算成员，在编译阶段会报错：
// const enum Color3 {
//   Red,
//   Green,
//   Blue = "blue".length
// }
// index.ts:128:10 - error TS2474: In 'const' enum declarations member initializer must be constant expression.

// 外部枚举（Ambient Enums） 使用declare enum定义的枚举类型
declare enum Directions2 {
  Up,
  Down,
  Left,
  Right
}
let directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
// declare定义的类型只会用于编译时的检查，编译结果中会被删除
// 编译后的结果：
// var directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];

// 同时使用declare 和 const 也是可以的
declare const enum Directions3 {
  Up,
  Down,
  Left,
  Right
}
let directions3 = [Directions3.Up, Directions3.Down, Directions3.Left, Directions3.Right];
// 编译后的结果：
// var directions3 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 类
// 属性和方法 使用constructor定义构造函数
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Rey');
console.log(a.sayHi()); // my name is Rey

// 类的继承 使用extends关键字实现继承，子类中使用super关键字来调用父类的构造函数和方法
// 存取器 使用getter和setter可以改变属性的赋值和读取行为
// 使用static修饰符的方法称为静态方法，不需要实例化，直接通过类来调用
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的constructor(name)
    console.log(this.name);
  }
  
  get name() {
    return 'shieh';
  }

  set name(value) {
    console.log('setter:' + value);
  }

  sayHi() {
    return 'hello,' + super.sayHi();
  }
}

let cat = new Cat('Rey');
console.log(cat.sayHi()); // hello,My name is Rey
cat.name = 'Tom';
console.log(cat.name);
Animal.isAnimal(cat); // true
// a.isAnimal(cat); // TypeError: a.isAnimal is not a function

// ES7中类的用法
// 实例属性 ES6中实例的属性只能通过构造函数中的this.xxx来定义，ES7提案中可以直接在类里面定义：
// 静态属性 ES7提案中，可以使用static 定义静态属性
class Animal2 {
  name = 'Rey';

  constructor() {
    // ...
  }

  static num = 42;
}
let a2 = new Animal2();
console.log(a2.name); // Rey
console.log(Animal2.num); // 42

// TypeScript中类的用法
// public private 和 protected
// public修饰的属性或方法是共有的，可以在任何地方被访问，默认所有的属性和方法都是public
// private修饰的属性或方法是私有的，不能再声明它的类的外部访问
// protected修饰的属性或方法是受保护的，和private类似，区别是它在子类中也是允许被访问的
// 需要注意的是，TypeScript编译之后的代码中，并没有限制private属性在外部的可访问性

// 抽象类 abstract用于定义抽象类和其中的抽象方法
// 抽象类是不允许被实例化的
// abstract class Animal3 {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }
// let a3 = new Animal3('Rey');
// index.ts:232:10 - error TS2511: Cannot create an instance of an abstract class.

// 抽象类中的抽象方法必须被子类实现：
// abstract class Animal3 {
//   public name;
//   public constructor(name) {
//     this.name = name;
//   }
//   public abstract sayHi();
// }

// class Cat2 extends Animal3 {
//   public eat() {
//     console.log(`${this.name} is eating.`);
//   }
// }

// let cat2 = new Cat2('Rey');
// index.ts:244:7 - error TS2515: Non-abstract class 'Cat2' does not implement inherited abstract member 'sayHi' from class 'Animal3'.

abstract class Animal3 {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}
class Cat2 extends Animal3 {
  public sayHi() {
    console.log(`My name is ${this.name}.`);
  }
}
let cat2 = new Cat2('Rey');

// 类的类型，与接口类似
class Animal4 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `my name is ${this.name}`;
  }
}
let a4: Animal4 = new Animal4('Rey');
console.log(a4.sayHi());

// 类与接口
// 一个类可以实现多个接口：
interface Alarm {
  alert();
}
interface Light {
  lightOn();
  lightOff();
}
class Car implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}
// 接口继承类
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}
// 混合类型
// 可以使用接口的方式来定义一个函数需要符合的形状：
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
// 一个函数还可以有自己的属性和方法
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 泛型(Generics) 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray<string>(3, 'x');
// 也可以不手动指定，让类型推论自动推算出来：
createArray(3, 'x');

// 一次定义多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]

// 泛型约束 由于在函数内部使用泛型变量的时候，不知道它使哪种类型，所以不能随意的操作它的属性或方法
// 但可以对泛型进行约束，只允许函数传入那些包含length属性的变量
interface Lengthwise {
  length: number;
}
function loggingIdentify<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// 该例中使用extends榆树了泛型T必须包含length属性，若没有，编译阶段就会报错
loggingIdentify(7);
// index.ts:362:17 - error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.

// 多个类型参数之间可以相互约束
function copyFiled<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4};
copyFiled(x, { b: 10, d: 20 });
// 通过使用两个类型参数，要求T必须继承于U，这样保证了T中不会出现U中不存在的字段

// 使用泛型定义接口
interface CreateArrayFunc2 {
  <T>(length: number, value: T): Array[T];
}

let createArray2: CreateArrayFunc2;
createArray2 = function<T>(length: number, value: T): Array[T] {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray2(3, 'x');

// 将泛型参数提前到接口名上：
interface CreateArrayFunc3<T> {
  (length: number, value: T): Array[T];
}

let createArray3: CreateArrayFunc3<any>;
createArray3 = function<T>(length: number, value: T): Array[T] {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray3(3, 'x');

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; }

// 泛型参数的默认类型
function createArray4<T = string>(length: number, value: T): Array[T] {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

// 声明合并 如果定义了两个相同名字的函数、接口或类，它们会合并成一个类型：
// 函数的合并
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// 接口的合并
// 接口中属性的合并会简单的合并到一个接口中
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}
// 合并后
// interface Alarm {
//   price: number;
//   weight: number;
// }
// 但需要注意，合并的属性的类型必须是唯一的，若重复且类型不相同，就会报错
// 接口中方法的合并和函数的合并一样

