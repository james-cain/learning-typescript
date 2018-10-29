var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
function handleEvent(ele, event) {
    // do something
}
handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event中没有dbclick
// 类型别名与字符串字面量类型都是使用type进行定义
// 元组（Tuple） 元组合并了不同类型的对象
// 如，定义一对值分别为string和number的元组
var reyshieh;
reyshieh[0] = 'rey';
reyshieh[1] = 26;
reyshieh[0].slice(1);
reyshieh[1].toFixed(2);
// 只赋值其中一项：
reyshieh[0] = 'shieh';
// 越界的元素
// 当添加越界的元素时，类型会被限制为元组中每个类型的联合类型
var reyshieh1;
reyshieh1 = ['rey', 26];
reyshieh1.push('http://reyshieh.com/');
reyshieh1.push(true);
// index.ts:42:16 - error TS2345: Argument of type 'true' is not assignable to parameter of type 'string | number'.
// 枚举（Enum）用于取值被限定在一定范围内的场景
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
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
var Days2;
(function (Days2) {
    Days2[Days2["Sun"] = 7] = "Sun";
    Days2[Days2["Mon"] = 1] = "Mon";
    Days2[Days2["Tue"] = 2] = "Tue";
    Days2[Days2["Wed"] = 3] = "Wed";
    Days2[Days2["Thu"] = 4] = "Thu";
    Days2[Days2["Fri"] = 5] = "Fri";
    Days2[Days2["Sat"] = 6] = "Sat";
})(Days2 || (Days2 = {}));
;
// 未手动赋值的枚举项会接着上一个枚举项递增
var Days3;
(function (Days3) {
    Days3[Days3["Sun"] = 3] = "Sun";
    Days3[Days3["Mon"] = 1] = "Mon";
    Days3[Days3["Tue"] = 2] = "Tue";
    Days3[Days3["Wed"] = 3] = "Wed";
    Days3[Days3["Thu"] = 4] = "Thu";
    Days3[Days3["Fri"] = 5] = "Fri";
    Days3[Days3["Sat"] = 6] = "Sat";
})(Days3 || (Days3 = {}));
;
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
var Days4;
(function (Days4) {
    Days4[Days4["Sun"] = 7] = "Sun";
    Days4[Days4["Mon"] = 8] = "Mon";
    Days4[Days4["Wed"] = 9] = "Wed";
    Days4[Days4["Thu"] = 10] = "Thu";
    Days4[Days4["Fri"] = 11] = "Fri";
    Days4[Days4["Sat"] = "S"] = "Sat";
})(Days4 || (Days4 = {}));
;
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
var Days5;
(function (Days5) {
    Days5[Days5["Sun"] = 7] = "Sun";
    Days5[Days5["Mon"] = 1.5] = "Mon";
    Days5[Days5["Tue"] = 2.5] = "Tue";
    Days5[Days5["Wed"] = 3.5] = "Wed";
    Days5[Days5["Thu"] = 4.5] = "Thu";
    Days5[Days5["Fri"] = 5.5] = "Fri";
    Days5[Days5["Sat"] = 6.5] = "Sat";
})(Days5 || (Days5 = {}));
;
console.log(Days5["Sun"] === 7); // true
console.log(Days5["Mon"] === 1.5); // true
console.log(Days5["Tue"] === 2.5); // true
// 枚举项可以是常数项和计算所得项
// 但是计算所得项后面不能放未手动赋值的项，否则会因为无法获得初始值而报错
// 不会报错的情况：
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = "blue".length] = "Blue";
})(Color || (Color = {}));
;
// 会报错的情况：
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = "red".length] = "Red";
    Color2[Color2["Green"] = void 0] = "Green";
    Color2[Color2["Blue"] = void 0] = "Blue";
})(Color2 || (Color2 = {}));
;
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
var directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
var directions3 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
// 编译后的结果：
// var directions3 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
// 类
// 属性和方法 使用constructor定义构造函数
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.sayHi = function () {
        return "My name is " + this.name;
    };
    Animal.isAnimal = function (a) {
        return a instanceof Animal;
    };
    return Animal;
}());
var a = new Animal('Rey');
console.log(a.sayHi()); // my name is Rey
// 类的继承 使用extends关键字实现继承，子类中使用super关键字来调用父类的构造函数和方法
// 存取器 使用getter和setter可以改变属性的赋值和读取行为
// 使用static修饰符的方法称为静态方法，不需要实例化，直接通过类来调用
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Object.defineProperty(Cat.prototype, "name", {
        get: function () {
            return 'shieh';
        },
        set: function (value) {
            console.log('setter:' + value);
        },
        enumerable: true,
        configurable: true
    });
    Cat.prototype.sayHi = function () {
        return 'hello,' + _super.prototype.sayHi.call(this);
    };
    return Cat;
}(Animal));
var cat = new Cat('Rey');
console.log(cat.sayHi()); // hello,My name is Rey
cat.name = 'Tom';
console.log(cat.name);
Animal.isAnimal(cat); // true
// a.isAnimal(cat); // TypeError: a.isAnimal is not a function
// ES7中类的用法
// 实例属性 ES6中实例的属性只能通过构造函数中的this.xxx来定义，ES7提案中可以直接在类里面定义：
// 静态属性 ES7提案中，可以使用static 定义静态属性
var Animal2 = /** @class */ (function () {
    function Animal2() {
        this.name = 'Rey';
        // ...
    }
    Animal2.num = 42;
    return Animal2;
}());
var a2 = new Animal2();
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
var Animal3 = /** @class */ (function () {
    function Animal3(name) {
        this.name = name;
    }
    return Animal3;
}());
var Cat2 = /** @class */ (function (_super) {
    __extends(Cat2, _super);
    function Cat2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat2.prototype.sayHi = function () {
        console.log("My name is " + this.name + ".");
    };
    return Cat2;
}(Animal3));
var cat2 = new Cat2('Rey');
// 类的类型，与接口类似
var Animal4 = /** @class */ (function () {
    function Animal4(name) {
        this.name = name;
    }
    Animal4.prototype.sayHi = function () {
        return "my name is " + this.name;
    };
    return Animal4;
}());
var a4 = new Animal4('Rey');
console.log(a4.sayHi());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('Car alert');
    };
    Car.prototype.lightOn = function () {
        console.log('Car light on');
    };
    Car.prototype.lightOff = function () {
        console.log('Car light off');
    };
    return Car;
}());
// 接口继承类
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
// 泛型(Generics) 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x');
// 也可以不手动指定，让类型推论自动推算出来：
createArray(3, 'x');
// 一次定义多个类型参数
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
function loggingIdentify(arg) {
    console.log(arg.length);
    return arg;
}
// 该例中使用extends榆树了泛型T必须包含length属性，若没有，编译阶段就会报错
loggingIdentify(7);
