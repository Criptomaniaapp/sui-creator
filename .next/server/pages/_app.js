/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context/WalletContext.tsx":
/*!***************************************!*\
  !*** ./src/context/WalletContext.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WalletContext: () => (/* binding */ WalletContext),\n/* harmony export */   WalletProvider: () => (/* binding */ WalletProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst WalletContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nconst WalletProvider = ({ children })=>{\n    const [walletAddress, setWalletAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isWalletInstalled, setIsWalletInstalled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"WalletProvider.useEffect\": ()=>{\n            setIsWalletInstalled( false && 0);\n        }\n    }[\"WalletProvider.useEffect\"], []);\n    const connectWallet = async ()=>{\n        if (!isWalletInstalled) {\n            alert(\"Sui Wallet no está instalada.\");\n            return;\n        }\n        try {\n            const accounts = await window.suiWallet.request({\n                method: \"accounts\"\n            });\n            if (accounts && accounts.length > 0) {\n                setWalletAddress(accounts[0]);\n            }\n        } catch (error) {\n            console.error(\"Error al conectar la wallet:\", error);\n        }\n    };\n    const disconnectWallet = ()=>{\n        setWalletAddress(null);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WalletContext.Provider, {\n        value: {\n            walletAddress,\n            isWalletInstalled,\n            connectWallet,\n            disconnectWallet\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\hp\\\\proyectos\\\\sui-creator\\\\sui-dapp\\\\src\\\\context\\\\WalletContext.tsx\",\n        lineNumber: 40,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9XYWxsZXRDb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXNFO0FBUy9ELE1BQU1HLDhCQUFnQkgsb0RBQWFBLENBQWdDSSxXQUFXO0FBRTlFLE1BQU1DLGlCQUFpQixDQUFDLEVBQUVDLFFBQVEsRUFBMkI7SUFDbEUsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR1AsK0NBQVFBLENBQWdCO0lBQ2xFLE1BQU0sQ0FBQ1EsbUJBQW1CQyxxQkFBcUIsR0FBR1QsK0NBQVFBLENBQUM7SUFFM0RDLGdEQUFTQTtvQ0FBQztZQUNSUSxxQkFBcUIsTUFBNkIsSUFBSSxDQUFrQjtRQUMxRTttQ0FBRyxFQUFFO0lBRUwsTUFBTUcsZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQ0osbUJBQW1CO1lBQ3RCSyxNQUFNO1lBQ047UUFDRjtRQUNBLElBQUk7WUFDRixNQUFNQyxXQUFXLE1BQU1KLE9BQU9DLFNBQVMsQ0FBQ0ksT0FBTyxDQUFDO2dCQUFFQyxRQUFRO1lBQVc7WUFDckUsSUFBSUYsWUFBWUEsU0FBU0csTUFBTSxHQUFHLEdBQUc7Z0JBQ25DVixpQkFBaUJPLFFBQVEsQ0FBQyxFQUFFO1lBQzlCO1FBQ0YsRUFBRSxPQUFPSSxPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQ2hEO0lBQ0Y7SUFFQSxNQUFNRSxtQkFBbUI7UUFDdkJiLGlCQUFpQjtJQUNuQjtJQUVBLHFCQUNFLDhEQUFDTCxjQUFjbUIsUUFBUTtRQUNyQkMsT0FBTztZQUFFaEI7WUFBZUU7WUFBbUJJO1lBQWVRO1FBQWlCO2tCQUUxRWY7Ozs7OztBQUdQLEVBQUUiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcaHBcXHByb3llY3Rvc1xcc3VpLWNyZWF0b3JcXHN1aS1kYXBwXFxzcmNcXGNvbnRleHRcXFdhbGxldENvbnRleHQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW50ZXJmYWNlIFdhbGxldENvbnRleHRUeXBlIHtcclxuICB3YWxsZXRBZGRyZXNzOiBzdHJpbmcgfCBudWxsO1xyXG4gIGlzV2FsbGV0SW5zdGFsbGVkOiBib29sZWFuO1xyXG4gIGNvbm5lY3RXYWxsZXQ6ICgpID0+IHZvaWQ7XHJcbiAgZGlzY29ubmVjdFdhbGxldDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFdhbGxldENvbnRleHQgPSBjcmVhdGVDb250ZXh0PFdhbGxldENvbnRleHRUeXBlIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFdhbGxldFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3ROb2RlIH0pID0+IHtcclxuICBjb25zdCBbd2FsbGV0QWRkcmVzcywgc2V0V2FsbGV0QWRkcmVzc10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNXYWxsZXRJbnN0YWxsZWQsIHNldElzV2FsbGV0SW5zdGFsbGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldElzV2FsbGV0SW5zdGFsbGVkKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgISF3aW5kb3cuc3VpV2FsbGV0KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNvbm5lY3RXYWxsZXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzV2FsbGV0SW5zdGFsbGVkKSB7XHJcbiAgICAgIGFsZXJ0KFwiU3VpIFdhbGxldCBubyBlc3TDoSBpbnN0YWxhZGEuXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHdpbmRvdy5zdWlXYWxsZXQucmVxdWVzdCh7IG1ldGhvZDogXCJhY2NvdW50c1wiIH0pO1xyXG4gICAgICBpZiAoYWNjb3VudHMgJiYgYWNjb3VudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHNldFdhbGxldEFkZHJlc3MoYWNjb3VudHNbMF0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgY29uZWN0YXIgbGEgd2FsbGV0OlwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGlzY29ubmVjdFdhbGxldCA9ICgpID0+IHtcclxuICAgIHNldFdhbGxldEFkZHJlc3MobnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXYWxsZXRDb250ZXh0LlByb3ZpZGVyXHJcbiAgICAgIHZhbHVlPXt7IHdhbGxldEFkZHJlc3MsIGlzV2FsbGV0SW5zdGFsbGVkLCBjb25uZWN0V2FsbGV0LCBkaXNjb25uZWN0V2FsbGV0IH19XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvV2FsbGV0Q29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59O1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiV2FsbGV0Q29udGV4dCIsInVuZGVmaW5lZCIsIldhbGxldFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ3YWxsZXRBZGRyZXNzIiwic2V0V2FsbGV0QWRkcmVzcyIsImlzV2FsbGV0SW5zdGFsbGVkIiwic2V0SXNXYWxsZXRJbnN0YWxsZWQiLCJ3aW5kb3ciLCJzdWlXYWxsZXQiLCJjb25uZWN0V2FsbGV0IiwiYWxlcnQiLCJhY2NvdW50cyIsInJlcXVlc3QiLCJtZXRob2QiLCJsZW5ndGgiLCJlcnJvciIsImNvbnNvbGUiLCJkaXNjb25uZWN0V2FsbGV0IiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/context/WalletContext.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_WalletContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/context/WalletContext */ \"./src/context/WalletContext.tsx\");\n\n\n // Importar el proveedor del contexto\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_WalletContext__WEBPACK_IMPORTED_MODULE_2__.WalletProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\hp\\\\proyectos\\\\sui-creator\\\\sui-dapp\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\hp\\\\proyectos\\\\sui-creator\\\\sui-dapp\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE4QjtBQUUyQixDQUFDLHFDQUFxQztBQUVoRixTQUFTQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELHFCQUNFLDhEQUFDSCxrRUFBY0E7a0JBQ2IsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcaHBcXHByb3llY3Rvc1xcc3VpLWNyZWF0b3JcXHN1aS1kYXBwXFxzcmNcXHBhZ2VzXFxfYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XHJcbmltcG9ydCB7IFdhbGxldFByb3ZpZGVyIH0gZnJvbSBcIkAvY29udGV4dC9XYWxsZXRDb250ZXh0XCI7IC8vIEltcG9ydGFyIGVsIHByb3ZlZWRvciBkZWwgY29udGV4dG9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxXYWxsZXRQcm92aWRlcj5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9XYWxsZXRQcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG4iXSwibmFtZXMiOlsiV2FsbGV0UHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();