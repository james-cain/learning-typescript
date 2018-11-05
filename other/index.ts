// never https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Basic%20Types.html#never

// 在泛型里使用类类型 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Generics.html#%E5%9C%A8%E6%B3%9B%E5%9E%8B%E9%87%8C%E4%BD%BF%E7%94%A8%E7%B1%BB%E7%B1%BB%E5%9E%8B

// 数组的类型推论 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Type%20Inference.html#%E6%9C%80%E4%BD%B3%E9%80%9A%E7%94%A8%E7%B1%BB%E5%9E%8B

// 函数输入的类型推论 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Type%20Inference.html#%E4%B8%8A%E4%B8%8B%E6%96%87%E7%B1%BB%E5%9E%8B

// 允许不严格符合类型，只需要在一定规则下兼容即可 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Type%20Compatibility.html

// 使用 & 将多种类型的共有部分叠加成一种类型 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Advanced%20Types.html#%E4%BA%A4%E5%8F%89%E7%B1%BB%E5%9E%8B%EF%BC%88intersection-types%EF%BC%89

// 混入 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Mixins.html

// tsconfig.json
// 根据目录下存在tsconfig.json文件，来判断该目录为Typescript项目的根目录
// tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项
// 编译方式可以为：
// 1、使用tsconfig.json
//  a. 不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录
//  b. 不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录
// 示例
// 使用“files”属性，files指定一个包含相对或绝对文件路径的列表
// {
//   "compilerOptions": {
//     "module": "commonjs",
//     "noImplicitAny": true,
//     "removeComments": true,
//     "preserveConstEnums": true,
//     "sourceMap": true
//   },
//   "files": [
//     "core.ts",
//     "sys.ts",
//     "types.ts",
//     "scanner.ts"
//   ]
// }
// 使用“include”和“exclude”属性，指定一个文件glob匹配模式列表
// 支持的glob通配符有：
// * 匹配0或多个字符（不包括目录分隔符）
// ? 匹配一个任意字符（不包括目录分隔符）
// **/ 递归匹配任意子目录
// {
//   "compilerOptions": {
//     "module": "commonjs",
//     "noImplicitAny": true,
//     "removeComments": true,
//     "preserveConstEnums": true,
//     "sourceMap": true
//   },
//   "include": [
//     "src/**/*"
//   ],
//   "exclude": [
//     "node_modules",
//     "**/*.spec.ts"
//   ]
// }

// @types，typeRoots和types
// 默认所有可见的"@types"包会在编译过程中被包含进来。node_modules/@types文件下以及它们子文件夹下的所有包都是可见的
// 比如 ./node_modules/@types/ ，../node_modules/@types/ 和 ../../node_modules/@types等等 都是可见的
// 如果指定了typeRoots，只有typeRoots下面的包才会被包含进来
// {
//   "compilerOptions": {
//     "typeRoots": ["./typings"]
//   }
// }
// 以上配置文件会包含所有.typings下面的包，而不包含./node_modules/@types里面的包
// 如果指定了types，只有被列出来的包才会被包含进来，比如
// {
//   "compilerOptions": {
//     "types": ["node", "lodash", "express"]
//   }
// }
// 这个tsconfig.json文件将仅会包含
// ./node_modules/@types/node, ./node_modules/@types/lodash, ./node_modules/@types/express

// 使用extends继承配置
// tsconfig.json文件可以利用extends属性从另一个配置文件里继承配置
// extends的值是一个字符串，包含指向另一个要继承文件的路径
// 原文件里的配置先被加载，然后被来自继承文件里的配置重写。
// 配置文件里的相对路径在解析时相对于它所在的文件
// configs/base.json:
// {
//   "compilerOptions": {
//     "noImplicitAny": true,
//     "strictNullChecks": true
//   }
// }
// tsconfig.json:
// {
//   "extends": "./config/base",
//   "files": [
//     "main.ts",
//     "supplemental.ts"
//   ]
// }

// 书写声明文件
// 防止命名冲突
// 可以使用定义的全局变量名来声明命名空间类型。比如，库定义一个全局的值rey，
declare namespace rey {
  interface shiehSettings {}
}

// 举例一些声明方法
// 1. 全局变量
declare var foo: number;
console.log('Half the number of widgets is ' + (foo / 2));
// 2. 全局函数
declare function greet(greeting: string): void;
greet('hello, world');
// 3. 带属性的对象
declare namespace myLib {
  function makeGreeting(s: string): string;
  let numberOfGreeting: number;
}
let result = myLib.makeGreeting('hello, world');
console.log('The computed greeting is ' + result);
let count = myLib.numberOfGreeting;
// 4. 函数重载
declare type Widget = number;
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
let x2: Widget = getWidget(43);
let arr: Widget[] = getWidget('all of them');
// 5. 可重用类型（接口）
interface GreetingSettings2 {
  greeting: string;
  duration?: number;
  color?: string;
}
declare function greet(setting: GreetingSettings2): void;
greet({
  greeting: 'hello world',
  duration: 4000
});
// 6. 可重用类型（类型别名）
type GreetingLike = string | (() => string);
declare function greet(g: GreetingLike): void;
function getGreeting() {
  return 'handy';
}
greet('hello');
greet(getGreeting);
// 7. 类
declare class Greeter {
  constructor(greeting: string);
  greeting: string;
  showGreeting(): void;
}
const myGreeter = new Greeter('hello, world');
myGreeter.greeting = 'howdy';
myGreeter.showGreeting();

// 组合
// 一个给定的名字A，可以找出三种不同的意义：一个类型、一个值或一个命名空间。比如，在声明let m: A.A = A，
// A首先被当做命名空间，然后做为类型名，最后是值。这些意义最终可能会指向完全不同的声明
// 先看一个没有使用组合的方式，写一个模块文件foo.d.ts
export interface SomeType {
  count: number;
}
export var SomeVar: { a: SomeType };
// 使用这个模块
// import * as foo from './foo';
// let x: foo.SomeType = foo.SomeVar.a;
// console.log(x.count);
// 但是上面SomeType和SomeVar是很相关的，可以让他们有相同的名字。可以使用组合通过相同的名字Bar表示两种不同的对象（值和对象）:
export interface Bar {
  count: number;
}
export var Bar: { a: Bar };
// 使用
// import { Bar } from './foo';
// let x: Bar = Bar.a;
// console.log(x.count);

// 一些声明能够通过多个声明组合。比如class C {} 和 interface C {} 可以同时存在并且都可以作为C类型的属性
// 只要不产生冲突就是合法的
// 一个普通的规则是值总是会和同名的其它值产生冲突除非它们在不同的命名空间里，类型冲突则发生在使用类型别名声明的情况下(type s = string)，命名空间永远不会发生冲突
// 利用interface添加，可以使用一个interface 往别的interface声明里添加额外成员
interface Foo {
  x: number;
}
interface Foo {
  y: number;
}
// let a: Foo = ...;
// console.log(a.x + a.y); // OK
// 同样作用于类：
class Foo {
  x: number;
}
interface Foo {
  y: number;
}
// let a: Foo = ...;
// console.log(a.x + a.y); // OK

// 命名空间
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
// 尝试一些例子
let strings = ['hello', '98052', '101'];
// validators使用
let validators: { [s: string]: Validation.StringValidator; } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();
// 展示每个string是否通过验证
for (let s of strings) {
  for (let name in validators) {
    console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
  }
}

// 多文件中的命名空间
// 可以把命名空间分割成多个文件。尽管在不同的文件，它们仍然是同一个命名空间，并且在使用的时候就如同在一个文件中定义的一样。
// 因为不同文件之间存在依赖关系，所以需要加入引用标签来告诉编译器文件之间的关联
// 例如，还是借用上例
// Validation.ts
// namespace Validation {
//   export interface StringValidator {
//     isAcceptable(s: string): boolean;
//   }
// }
// LettersOnlyValidator.ts
// /// <reference path="Validation.ts" />
// namespace Validation {
//   const lettersRegexp = /^[A-Za-z]+$/;
//   export class LettersOnlyValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return lettersRegexp.test(s);
//     }
//   }
// }
// ZipCodeValidation.ts
// /// <reference path="Validation.ts" />
// namespace Validation {
//   const numberRegexp = /^[0-9]+$/;
//   export class ZipCodeValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return s.length === 5 && numberRegexp.test(s);
//     }
//   }
// }
// Test.ts
// /// <reference path="Validation.ts" />
// /// <reference path="LettersOnlyValidation.ts" />
// /// <reference path="ZipCodeValidation.ts" />
// // 尝试一些例子
// let strings = ['hello', '98052', '101'];
// // validators使用
// let validators: { [s: string]: Validation.StringValidator; } = {};
// validators['ZIP code'] = new Validation.ZipCodeValidator();
// validators['Letters only'] = new Validation.LettersOnlyValidator();
// // 展示每个string是否通过验证
// for (let s of strings) {
//   for (let name in validators) {
//     console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
//   }
// }
// 当涉及到多文件时，必须确保所有编译后的代码都被加载，有两种方式
// 第一种方式，把所有的输入文件编译为一个输出文件，需要使用--outFile标记：
// tsc --outFile sample.js Test.ts
// 第二种方式，可以编译每一个文件（默认方式），那么每个源文件都会对应生成一个JavaScript文件
// 然后再页面上通过<script>标签把所有生成的JavaScript文件按正确的顺序引进来，如
// MyTestPage.html
// <script src="Validation.js" type="text/javascript" />
// <script src="LettersOnlyValidation.js" type="text/javascript" />
// <script src="ZipCodeValidation.js" type="text/javascript" />
// <script src="Test.js" type="text/javascript" />

// 别名
// 另一种简化命名空间操作的方法是使用import q = x.y.z;给常用的对象起一个短的名字。例如
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // 和"new Shapes.Polygons.Square()"是一样的作用
// 这里并没有使用require关键字，而是直接使用导入符号的限定名赋值。

// 声明合并
// "声明合并"是指编译器将针对同一个名字的两个独立声明合并为单一声明。合并后的声明同时拥有原先两个声明的特性。任何数量的声明都可被合并；不局限于两个声明
// 1. 合并接口，从根本上说，合并的机制是把双方的成员放到一个同名的接口里
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
// 接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。如果两个接口中同时声明了同名的费函数成员且它们的类型不同，则编译器会报错
// 当接口A与后来的接口A合并时，后面的接口具有更高的优先级
// 每组接口里的声明顺序保持不变，但各组接口之间的顺序是后来的接口重载出现在靠前位置
// 例如
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}
// 以上合并成一个声明：
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
// 重载规则会在一个例外中发生变化。如果签名里有一个参数的类型是单一的字符串字面量（比如，不是字符串字面量的联合类型），那么将会被提升到重载列表的最顶端
// 比如
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: 'div'): HTMLDivElement;
  createElement(tagName: 'span'): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: 'canvas'): HTMLCanvasElement;
}
// 合并后
interface Document {
  createElement(tagName: 'canvas'): HTMLCanvasElement;
  createElement(tagName: 'div'): HTMLDivElement;
  createElement(tagName: 'span'): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
// 2.合并命名空间
// 对于命名空间的合并，模块导出的同名接口进行合并，构成单一命名空间内含合并后的接口
// 对于命名空间里的值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里
// 例如
namespace Animals {
  export class Zebra {}
}
namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog {}
}
// 合并后
// namespace Animals {
//   export interface Legged { numberOfLegs: number; }
//   export class Zebra {}
//   export class Dog {}
// }
// 对于非导出成员仅在其原有的（合并前的）命名空间内可见。这就是说合并之后，从其他命名空间合并进来的成员无法访问非导出的成员
// 例如
namespace Animal {
  let haveMuscles = true;

  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}
namespace Animal {
  export function doAnimalsHaveMuscles() {
    return haveMuscles; // error, haveMuscles is not visible here
  }
}
// 因为havaMuscles并没有导出，只有animalHaveMuscles函数共享了原始为合并的命名空间可以访问这个变量
// 3. 命名空间与类和函数和枚举类型合并
// 内部类模式
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel {}
}
// 遵循2中的规则，必须导出AlbumLabel类，好让合并的类能访问
// 合并结果是一个类并带有一个内部类，也可以使用命名空间为类增加一些静态属性
// 除了内部类模式，JavaScript创建一个函数稍后扩展它增加一些属性也是很常见的。
// TypeScript使用声明合并来达到这个目的并保证类型安全
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
  export let suffix = '';
  export let prefix = 'Hello, ';
}
alert(buildLabel('rey shieh'));
// 命名空间扩展枚举型
enum Color {
  red = 1,
  green = 2,
  blue = 4
}
namespace Color {
  export function mixColor(colorName: string) {
    if (colorName === 'yellow') {
      return Color.red + Color.green;
    } else if (colorName === 'white') {
      return Color.red + Color.green + Color.blue;
    }
  }
}
// 4. 非法的合并。目前类不能与其他类或变量合并

// 混入
class Disposable {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }
}
class Activatable {
  isActive: boolean;
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}
// 这里需要注意，没使用extends而是使用implements。把类当成了接口，进使用Disposable和Activatable的类型而非实现
// 这意味着需要在类里面实现接口。但是用mixin时要避免这种情况
class SmartObject implements Disposable, Activatable {
  constructor () {
    setInterval(() => console.log(this.isActive + ' : ' + this.isDisposed), 500);
  }
  interact() {
    this.activate();
  }
  // 在这里为将要mixin进来的属性方法创建出占位属性。告诉编译器这些成员在运行时可用。这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性
  // Disposable
  isDisposed: boolean = false;
  dispose: () => void;
  // Activatable
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

// 帮助实现混入操作的实现。遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码
function applyMixins(derivedCtor: any, baseCtors: any) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    })
  })
}

// Decorators
// 若要启用实验性的装饰器特性，必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项：
// 命令行：
// tsc --target ES5 experimentalDecorators
// tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ES5",
//     "experimentalDecorators": true
//   }
// }
// 装饰器，是一种特殊类型的声明，能够被附加到类声明、方法、访问符、属性或参数上
// 使用@expression形式，expression求值后必须为一个函数，会在运行时被调用，被装饰的声明信息作为参数传入
// 装饰器组合
// 多个装饰器可以同时应用到一个声明上，示例：
// @f
// @g
// x
// 当多个装饰器应用与一个声明上，它们求值方式与复合函数相似。上例实际等同于f(g(x))
// 在typescript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：
// 1. 由上至下依次对装饰器表达式求值
// 2. 求值的结果会被当做函数，由下至上依次调用
// 例子
function f() {
  console.log('f(): evaluated');
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called');
  }
}
function g() {
  console.log('g(): evaluated');
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called');
  }
}
class C {
  @f()
  @g()
  method() {}
}
// 在控制台中会打印结果：
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

// 装饰器求值
// 类中不同声明上的装饰器将按以下规定的顺序应用：
// 1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员
// 2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员
// 3. 参数装饰器应用到构造函数
// 4. 类装饰器应用到类

// 类装饰器
// 类装饰器表达式会在运行时当做函数被调用，类的构造函数作为其唯一的参数
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。因此，如果要返回一个新的构造函数，必须注意处理好原来的原型链。在运行时的装饰器调用逻辑中不会做这些操作
// 密封实例
@sealed
class Greeter2 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
// 当@sealed被执行时，它将密封此类的构造函数和原型
// 重载构造函数实例
function classDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  }
}
@classDecorator
class Greeter3 {
  property = 'property';
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter3('world'));

// 方法装饰器，方法装饰器会被应用到方法的属性描述符上，可以用来监视，修改或替换方法定义
// 方法装饰器表达式会在运行时当做函数被调用，传入下列3个参数：
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 成员的名字
// 3. 成员的属性描述符
// 如果方法装饰器返回一个值，会被用作方法的属性描述符
// 实例：
class Greeter4 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  }
}

// 访问器装饰器，访问器装饰器应用于访问器的属性描述符并且用来监视，修改或替换一个访问器的定义
// Typescript不允许同时装饰一个成员的get和set访问器
// 访问器装饰器表达式会在运行时当做函数被调用，传入下列3个参数：
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 成员的名字
// 3. 成员的属性描述符
// 如果访问器装饰器返回一个值，会被用作方法的属性描述符
// 实例：
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}
function configurable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  }
}

// 属性装饰器
// 属性装饰器表达式会在运行时当做函数被掉员工，传入下列2个参数
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 成员的名字
// 实例：
class Greeter5 {
  @format('Hello, %s')
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, 'greeting');
    return formatString.replace('%s', this.greeting);
  }
}
import 'reflect-metadata';
const formatMetadataKey = Symbol('format');
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(traget: any, propertyKey: string) {
  return Reflect.getmetadata(formatMetadataKey, target, propertyKey);
}

// 参数装饰器，参数构造器应用于类构造函数或方法声明
// 参数装饰器表达式会在运行时当做函数被调用，传入下列3个参数：
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 成员的名字
// 3. 参数在函数参数列表中的索引
// 参数装饰器只能用来监视一个方法的参数是否被传入，参数装饰器的返回值会被忽略

// 三斜线指令，仅放在包含它的文件的最顶端
// 方式一：
// /// <reference path="..." />
// 用于声明文件间的依赖，三斜线引用告诉编译器在编译过程中要引入的额外的文件
// 方式二：
// /// <reference types="..." />
// 与方式一相似，这个指令是用来声明依赖的。对这些包的名字的解析与在import语句里对模块名的解析类似，可以简单的把三斜线类型引用指令当做import声明包
// 例如，把/// <reference types="node" /> 引入到声明文件，表明这个文件使用了@types/node/index.d.ts里面声明的名字；并且这个包需要在编译阶段与声明文件一起被包含进来
