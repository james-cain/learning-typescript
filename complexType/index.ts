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
