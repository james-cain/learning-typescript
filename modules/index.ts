// 导出
// 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
// 以上对ZipCodeValidator的导出我们还可以对其重命名，改写：
// class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && numberRegexp.test(s);
//   }
// }
// export { ZipCodeValidator };
// export { ZipCodeValidator as mainValidator };

// 导入
// import { ZipCodeValidator as ZCV } from './ZipCodeValidator';
// let myValidator = new ZCV();
// 将整个模块导入到一个变量，并通过它来访问模块的导出部分
// import * as validator from './ZipCodeValidator';
// let myValidator = new validator.ZipCodeValidator();
