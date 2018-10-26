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
}

let a = new Animal('Rey');
console.log(a.sayHi()); // my name is Rey

// 类的继承 使用extends关键字实现继承，子类中使用super关键字来调用父类的构造函数和方法
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'hello,' + super.sayHi();
  }
}

let cat = new Cat('Rey');
console.log(cat.sayHi()); // hello,My name is Rey

// 存取器 使用getter和setter可以改变属性的赋值和读取行为
