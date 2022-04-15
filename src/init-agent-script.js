(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.demo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
exports.name = 'Tom';

},{}],2:[function(require,module,exports){
"use strict";
/*
 * @Author       : binsee
 * @Date         : 2022-04-15 13:37:19
 * @LastEditTime : 2022-04-15 14:28:13
 * @LastEditors  : binsee
 * @Description  :
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.output = exports.getName = exports.sayCallback = void 0;
const config_1 = require("./config");
exports.sayCallback = new NativeCallback(() => { }, 'void', ['int', 'pointer']);
const sayFunction = new NativeFunction(exports.sayCallback, 'void', ['int', 'pointer']);
const getName = () => config_1.name;
exports.getName = getName;
const output = (str) => {
    console.log('output() arg:', str);
    const text = `${config_1.name} say: ${str}`;
    sayFunction(Date.now(), Memory.allocUtf8String(text));
};
exports.output = output;
const error = () => {
    throw new Error('test error');
};
exports.error = error;
console.log(`Hello ${(0, exports.getName)()}!`);

},{"./config":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWdlbnQvY29uZmlnLnRzIiwic3JjL2FnZW50L21vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FhLFFBQUEsSUFBSSxHQUFHLEtBQUssQ0FBQTs7OztBQ0F6Qjs7Ozs7O0dBTUc7OztBQUVILHFDQUErQjtBQUVsQixRQUFBLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFDbkYsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQUMsbUJBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtBQUV4RSxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxhQUFJLENBQUE7QUFBcEIsUUFBQSxPQUFPLFdBQWE7QUFFMUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUVqQyxNQUFNLElBQUksR0FBRyxHQUFHLGFBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUE7QUFMWSxRQUFBLE1BQU0sVUFLbEI7QUFFTSxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7SUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFGWSxRQUFBLEtBQUssU0FFakI7QUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBQSxlQUFPLEdBQUUsR0FBRyxDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiJ9
