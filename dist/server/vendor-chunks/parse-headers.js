"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/parse-headers";
exports.ids = ["vendor-chunks/parse-headers"];
exports.modules = {

/***/ "(rsc)/./node_modules/parse-headers/parse-headers.js":
/*!*****************************************************!*\
  !*** ./node_modules/parse-headers/parse-headers.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\nvar trim = function(string) {\n    return string.replace(/^\\s+|\\s+$/g, \"\");\n}, isArray = function(arg) {\n    return Object.prototype.toString.call(arg) === \"[object Array]\";\n};\nmodule.exports = function(headers) {\n    if (!headers) return {};\n    var result = {};\n    var headersArr = trim(headers).split(\"\\n\");\n    for(var i = 0; i < headersArr.length; i++){\n        var row = headersArr[i];\n        var index = row.indexOf(\":\"), key = trim(row.slice(0, index)).toLowerCase(), value = trim(row.slice(index + 1));\n        if (typeof result[key] === \"undefined\") {\n            result[key] = value;\n        } else if (isArray(result[key])) {\n            result[key].push(value);\n        } else {\n            result[key] = [\n                result[key],\n                value\n            ];\n        }\n    }\n    return result;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzIiwibWFwcGluZ3MiOiI7QUFBQSxJQUFJQSxPQUFPLFNBQVNDLE1BQU07SUFDeEIsT0FBT0EsT0FBT0MsT0FBTyxDQUFDLGNBQWM7QUFDdEMsR0FDSUMsVUFBVSxTQUFTQyxHQUFHO0lBQ3BCLE9BQU9DLE9BQU9DLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUNKLFNBQVM7QUFDakQ7QUFFSkssT0FBT0MsT0FBTyxHQUFHLFNBQVVDLE9BQU87SUFDaEMsSUFBSSxDQUFDQSxTQUNILE9BQU8sQ0FBQztJQUVWLElBQUlDLFNBQVMsQ0FBQztJQUVkLElBQUlDLGFBQWFiLEtBQUtXLFNBQVNHLEtBQUssQ0FBQztJQUVyQyxJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSUYsV0FBV0csTUFBTSxFQUFFRCxJQUFLO1FBQzFDLElBQUlFLE1BQU1KLFVBQVUsQ0FBQ0UsRUFBRTtRQUN2QixJQUFJRyxRQUFRRCxJQUFJRSxPQUFPLENBQUMsTUFDdEJDLE1BQU1wQixLQUFLaUIsSUFBSUksS0FBSyxDQUFDLEdBQUdILFFBQVFJLFdBQVcsSUFDM0NDLFFBQVF2QixLQUFLaUIsSUFBSUksS0FBSyxDQUFDSCxRQUFRO1FBRWpDLElBQUksT0FBT04sTUFBTSxDQUFDUSxJQUFJLEtBQU0sYUFBYTtZQUN2Q1IsTUFBTSxDQUFDUSxJQUFJLEdBQUdHO1FBQ2hCLE9BQU8sSUFBSXBCLFFBQVFTLE1BQU0sQ0FBQ1EsSUFBSSxHQUFHO1lBQy9CUixNQUFNLENBQUNRLElBQUksQ0FBQ0ksSUFBSSxDQUFDRDtRQUNuQixPQUFPO1lBQ0xYLE1BQU0sQ0FBQ1EsSUFBSSxHQUFHO2dCQUFFUixNQUFNLENBQUNRLElBQUk7Z0JBQUVHO2FBQU87UUFDdEM7SUFDRjtJQUVBLE9BQU9YO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZGFwdGF0aW9uLWluc2lnaHRzLy4vbm9kZV9tb2R1bGVzL3BhcnNlLWhlYWRlcnMvcGFyc2UtaGVhZGVycy5qcz8xZTBiIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0cmltID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIHZhciBoZWFkZXJzQXJyID0gdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRlcnNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcm93ID0gaGVhZGVyc0FycltpXVxuICAgIHZhciBpbmRleCA9IHJvdy5pbmRleE9mKCc6JylcbiAgICAsIGtleSA9IHRyaW0ocm93LnNsaWNlKDAsIGluZGV4KSkudG9Mb3dlckNhc2UoKVxuICAgICwgdmFsdWUgPSB0cmltKHJvdy5zbGljZShpbmRleCArIDEpKVxuXG4gICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHJlc3VsdFtrZXldKSkge1xuICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSBbIHJlc3VsdFtrZXldLCB2YWx1ZSBdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIl0sIm5hbWVzIjpbInRyaW0iLCJzdHJpbmciLCJyZXBsYWNlIiwiaXNBcnJheSIsImFyZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJoZWFkZXJzIiwicmVzdWx0IiwiaGVhZGVyc0FyciIsInNwbGl0IiwiaSIsImxlbmd0aCIsInJvdyIsImluZGV4IiwiaW5kZXhPZiIsImtleSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJ2YWx1ZSIsInB1c2giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/parse-headers/parse-headers.js\n");

/***/ })

};
;