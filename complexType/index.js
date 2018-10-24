// 任意类型
// 普通类型，在复制过程中改变类型不被允许
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;
// 用any类型，则允许
var myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
// 类型推论（type inference）
var myFavoriteString = 'rey';
myFavoriteString = 8;
// 此时编译会报错 index.ts:14:1 - error TS2322: Type '8' is not assignable to type 'string'.
// 以上其实等价于
// let myFavoriteString: string = 'rey';
// myFavoriteString = 8;
// 如果定义时没有赋值，不管之后有没有赋值，会被推断为任意值(any)类型
// let something; => let something: any;
// 联合类型（Union Types）
var myFavoriteNumber2;
myFavoriteNumber2 = 'eight';
myFavoriteNumber2 = 8;
// 当Typescript不确定一个联合类型的变量到底是哪个类型时，只能访问联合类型的所有类型的共有属性或方法
function getLength(something) {
    return something.length;
}
// index.ts:30:20 - error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// 但以下访问共有属性不会报错
function getLength2(something) {
    return something.toString();
}
var rey = {
    name: 'rey',
    age: 26
};
var rey2 = {
    name: 'rey'
};
var rey3 = {
    name: 'rey',
    gender: 'male'
};
// index.ts:81:3 - error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// 该例中，任意属性的值允许是string，但可选属性age的值是number，所以报错
var rey4 = {
    name: 'rey',
    age: 26,
    gender: 'male'
};
var rey5 = {
    id: 111,
    name: 'rey',
    age: 26,
    gender: 'male'
};
// 数组类型
// 第一种表达方式：[类型+方括号]
var fibonacci = [1, 1, 2, 3, 5];
// 数组项中不允许出现其他的类型，如下，类型被推断为(number | string)[]
// let fibonacci: number[] = [1, '1', 2, 3, 5];
// 数组的方法参数也会根据数组在定义时约定的类型进行限制
// fibonacci.push('8') 报异常
// 第二种表达方式：数组泛型
var fibonacci2 = [1, 1, 2, 3, 5];
var fibonacci3 = [1, 1, 2, 3, 5];
// any在数组中的应用
var list = ['Rey Shieh', 26, { website: 'http://reyshieh.com' }];
// 类数组，比如arguments
// function sum() {
//   let args: number[] = arguments;
// }
// index.ts:130:7 - error TS2322: Type 'IArguments' is not assignable to type 'number[]'.
//   Property 'pop' is missing in type 'IArguments'.
// 以上的类数组定义会报错，常见的类数组都有自己的接口定义，如IArguments，NodeList，HTMLCollection等
function sum() {
    var args = arguments;
}
// 函数的类型
function sum2(x, y) {
    return x + y;
}
// 输入多余(或者少于要求)的参数是不背允许的
sum2(1, 2, 3);
// 函数表达式
var sum3 = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 定义可选参数 与接口中的可选属性类似，也用?表示可选的参数
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomcat = buildName('Tom', 'Cat');
var tom = buildName('Tom');
// 可选参数必须放在必须参数后面
// 可以给函数参加默认值
function buildName2(firstName, lastName) {
    if (lastName === void 0) { lastName = 'Cat'; }
    return firstName + ' ' + lastName;
}
// 当有默认值的时,就不受可选参数必须接在参数后面的限制
// 剩余参数 ...rest的方式获取函数中的剩余参数
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
// 类型断言(type assertion)
// function getLength(something: string | number): number {
//   return something.length;
// }
// 以上因为类型不确定，所以不能调不通用的方法或属性
// 但是还是想在不确定类型的时候就想访问类型或方法，可以
function getLength2(something) {
    if (something.length) {
        return something.length;
    }
    else {
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
function getLength3(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
// 类型断言的用法是在需要断言的变量前加上<Type>即可
// 断言类型不是类型转换，断言成一个联合类型中不存在的类型时不允许的
function toBoolean(something) {
    return something;
}
