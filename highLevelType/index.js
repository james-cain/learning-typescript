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
