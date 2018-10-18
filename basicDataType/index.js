var isDone = false;
// 使用构造函数Boolean创造的对象不是布尔值
// 以下定义，编译报错不能通过
// let createdByNewBoolean: boolean = new Boolean(1);
// new Boolean()返回的是一个Boolean对象
// 不会报错
var createdByNewBoolean = new Boolean(1);
// 直接调用Boolean也可以返回一个boolean类型
var createdByBoolean = Boolean(1);
// 数值
var decLiteral = 0;
// 十六进制
var hexLiteral = 0xf00d;
// 二进制
var binaryLiteral = 10;
// 八进制
var octalLiteral = 508;
// 注意：二进制和八进制在编译时，会转换为十进制数字
// let binaryLiteral = 10;
// let octalLiteral = 484;
var notAnumber = NaN;
var infinityNumber = Infinity;
// 字符串
var myName = 'Rey Shieh';
var myAge = 26;
// 空值 void表示没有任何返回值的函数
function alerName() {
    alert('My name is Rey Shieh');
}
// 声明一个void类型的变量没有用，只能将值赋为undefined和null
var unusable = undefined;
// Null和Undefined
// null类型的变量只能被赋为null，undefined类型的变量只能被赋为undefined
// 与void的区别，undefined和null是所有类型的子类型，也就是如可以将undefined类型的变量赋值给number类型的变量
var num = undefined;
// 或者如下也不会报错
var u;
var num2 = u;
// 而void类型的变量不能赋值给number类型的变量
// 如下报错
// let u: void;
// let num: number = u;
