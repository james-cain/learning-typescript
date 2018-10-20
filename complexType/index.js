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
var rey4 = {
    name: 'rey',
    age: 26,
    gender: 'male'
};
