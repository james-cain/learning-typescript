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
