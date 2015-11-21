/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(2);
	
	function App() {}
	
	App.run = function () {
	  window.game = new Game();
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./site.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./site.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700|Droid+Sans:700,400,600,800);", ""]);
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);", ""]);
	
	// module
	exports.push([module.id, ".debug {\n  border: 1px solid magenta !important; }\n\n.flexible {\n  display: -webkit-flex;\n  display: flex; }\n  .flexible.rows {\n    -webkit-flex-direction: row;\n    flex-direction: row; }\n  .flexible.columns {\n    -webkit-flex-direction: column;\n    flex-direction: column; }\n  .flexible.horizontally-centered {\n    -webkit-align-items: center;\n    align-items: center; }\n  .flexible.vertically-centered {\n    -webkit-justify-content: center;\n    justify-content: center; }\n\n.pull-left {\n  float: left; }\n\n.pull-right {\n  float: right; }\n\n.center-block {\n  margin: 0 auto; }\n\n.centered {\n  text-align: center; }\n\n.marginless {\n  margin: 0; }\n\n.paddingless {\n  padding: 0; }\n\n/* http://stackoverflow.com/a/6900392 */\n.unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.default-cursor {\n  cursor: default; }\n\n.uppercase {\n  text-transform: uppercase; }\n\n.lowercase {\n  text-transform: lowercase; }\n\n.capitalize {\n  text-transform: capitalize; }\n\n.larger {\n  font-size: 150%; }\n\n.large {\n  font-size: 125%; }\n\n/* Variables */\nhtml {\n  font-size: 14px;\n  -webkit-font-smoothing: antialiased; }\n\nbody {\n  font-family: \"Montserrat\", sans-serif; }\n\nh1 {\n  font-size: 4rem;\n  color: #37291a;\n  letter-spacing: 0.3rem;\n  word-spacing: 1rem; }\n\nsection.instructions {\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 400;\n  font-size: 1.3rem;\n  word-spacing: 0.08rem;\n  color: #5a422b;\n  background: #f0e8e0;\n  padding: 10px 50px;\n  border-radius: 8px; }\n  section.instructions p {\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem; }\n\nsection.instructions + section.game {\n  margin-top: 3rem;\n  padding: 1rem; }\n\nsection.game {\n  font-family: \"Droid Sans\", sans-serif;\n  background: white;\n  padding: 1.43rem;\n  border-radius: 6px; }\n\ncode {\n  padding: 2px 4px;\n  font-size: inherit;\n  color: #37291a;\n  border-radius: 4px;\n  margin-left: 0.125rem;\n  margin-right: 0.125rem; }\n  code:first-child {\n    margin-left: 0; }\n  code:last-child {\n    margin-right: 0; }\n\n.drop-container {\n  position: relative; }\n\n.parenthesis-tile {\n  position: relative;\n  font-size: 4.5rem;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 400;\n  color: initial;\n  width: 2rem;\n  height: 10rem;\n  margin: 0.5rem;\n  border: initial;\n  border-radius: 35%;\n  background-color: initial;\n  transition: background-color 75ms ease-out;\n  transition: font-size 75ms ease-in-out; }\n  .parenthesis-tile:hover {\n    background-color: initial;\n    color: #494f51;\n    border: initial; }\n  .parenthesis-tile .parenthesis {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-50%);\n    font-size: inherit;\n    font-weight: inherit;\n    background-color: transparent;\n    color: #37291a;\n    transition: inherit;\n    cursor: default; }\n\n.operator-tile {\n  position: relative;\n  font-size: 4.5rem;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 400;\n  color: #879093;\n  width: 6rem;\n  height: 6rem;\n  margin: 0.5rem;\n  border: 4px dashed transparent;\n  border-radius: 50%;\n  background-color: initial;\n  transition: background-color 75ms ease-out;\n  transition: font-size 75ms ease-in-out; }\n  .operator-tile:hover {\n    background-color: #d8dadb;\n    color: #494f51;\n    border: 4px dashed #afb5b7; }\n  .operator-tile .operator {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-50%);\n    font-size: inherit;\n    font-weight: inherit;\n    background-color: transparent;\n    color: #37291a;\n    transition: inherit; }\n  .operator-tile:hover .operator {\n    font-size: 5.175rem;\n    color: inherit; }\n  .operator-tile:active {\n    background: #afb5b7;\n    border: 4px dashed #879093; }\n    .operator-tile:active .operator {\n      font-size: 6.21rem; }\n\n.number-tile {\n  margin-left: 1rem;\n  margin-right: 1rem;\n  position: relative;\n  font-size: 4.5rem;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 400;\n  color: #37291a;\n  width: 10rem;\n  height: 10rem;\n  margin: 0.5rem;\n  border: 4px dashed transparent;\n  border-radius: 6px;\n  background-color: #f0e8e0;\n  transition: background-color 75ms ease-out;\n  transition: font-size 75ms ease-in-out; }\n  .number-tile:first-child {\n    margin-left: 0; }\n  .number-tile:last-child {\n    margin-right: 0; }\n  .number-tile:hover {\n    background-color: #e8dbcf;\n    color: #37291a;\n    border: 4px dashed #c7a889; }\n  .number-tile .number {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-50%);\n    font-size: inherit;\n    font-weight: inherit;\n    background-color: transparent;\n    color: inherit;\n    transition: inherit; }\n  .number-tile:hover .number {\n    font-size: 5.175rem;\n    color: inherit; }\n  .number-tile.swappable {\n    background-color: #eaf0f5;\n    border: 4px dashed #94b0cc;\n    color: #273d53; }\n  .number-tile.enclosable {\n    background-color: #c0ccbb;\n    border: 4px dashed #7d9572;\n    color: #10130f; }\n\n.equal-sign {\n  position: relative;\n  font-size: 5.4rem;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 400;\n  color: #37291a;\n  width: initial;\n  height: 10rem;\n  margin: 4.5rem;\n  border: initial;\n  border-radius: initial;\n  background-color: transparent;\n  transition: background-color 75ms ease-out;\n  transition: font-size 75ms ease-in-out; }\n  .equal-sign:hover {\n    background-color: transparent;\n    color: #37291a;\n    border: initial; }\n  .equal-sign .equals {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-50%); }\n\n.result-display {\n  position: relative;\n  font-size: 5.4rem;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 400;\n  color: #37291a;\n  width: initial;\n  height: 10rem;\n  margin: 2rem;\n  border: initial;\n  border-radius: initial;\n  background-color: transparent;\n  transition: background-color 75ms ease-out;\n  transition: font-size 75ms ease-in-out; }\n  .result-display:hover {\n    background-color: transparent;\n    color: #37291a;\n    border: initial; }\n  .result-display .result {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-50%); }\n", "", {"version":3,"sources":["/./src/src/styles/helpers.scss","/./src/src/styles/site.scss"],"names":[],"mappings":"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","file":"site.scss","sourcesContent":[".debug {\n  border: 1px solid magenta !important;\n}\n\n.flexible {\n  display: -webkit-flex;\n  display: flex;\n\n  &.rows {\n    -webkit-flex-direction: row;\n    flex-direction: row;\n  }\n\n  &.columns {\n    -webkit-flex-direction: column;\n    flex-direction: column;\n  }\n\n  &.horizontally-centered {\n    -webkit-align-items: center;\n    align-items: center;\n  }\n\n  &.vertically-centered {\n    -webkit-justify-content: center;\n    justify-content: center;\n  }\n}\n\n.pull-left {\n  float: left;\n}\n\n.pull-right {\n  float: right;\n}\n\n.center-block {\n  margin: 0 auto;\n}\n\n.centered {\n  text-align: center;\n}\n\n.marginless {\n    margin: 0;\n}\n\n.paddingless {\n    padding: 0;\n}\n\n/* http://stackoverflow.com/a/6900392 */\n.unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.default-cursor {\n  cursor: default;\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.lowercase {\n  text-transform: lowercase;\n}\n\n.capitalize {\n  text-transform: capitalize;\n}\n\n.larger {\n  font-size: 150%;\n}\n\n.large {\n  font-size: 125%;\n}\n\n@mixin center-via-transform-translate() {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n}\n\n@mixin space-between($value) {\n  margin-left: $value / 2;\n  margin-right: $value / 2;\n\n  &:first-child {\n    margin-left: 0;\n  }\n\n  &:last-child {\n    margin-right: 0;\n  }\n}","@import \"helpers\";\n@import \"fonts\";\n\n/* Variables */\n$font-montserrat: 'Montserrat', sans-serif;\n$font-droidsans: 'Droid Sans', sans-serif;\n$font-roboto: 'Roboto Condensed', sans-serif;\n$color-wood: #ede3d9;\n$color-wood-invert: invert($color-wood);\n$color-marble: #9597a1;\n$color-fern: #a2b1a6;\n$color-forest: #c0ccbb;\n\n$base-font: $font-montserrat;\n$base-font-size: 14px;\n$base-space-between: 1rem;\n\n$tile-transition-duration: 75ms;\n\n$tile-background: lighten($color-wood, 2%);\n$tile-color: darken($tile-background, 75%);\n$tile-size: 10rem;\n$tile-font-size: $tile-size * 0.45;\n$tile-border-width: 4px;\n$tile-border-radius: 6px;\n$tile-space-between: $base-space-between * 2;\n$tile-hover-background: darken($tile-background, 5%);\n$tile-hover-border-color: darken($tile-background, 25%);\n$tile-hover-font-size: $tile-font-size * 1.15;\n$tile-active-background: lighten(invert($tile-color), 10%);\n\n$operator-size: 6rem;\n$operator-color: #879093;\n$operator-space-between: $base-space-between / 2;\n\n* {\n}\n\nhtml {\n  font-size: $base-font-size;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody {\n  font-family: $base-font;\n}\n\nh1 {\n  font-size: 4rem;\n  color: $tile-color;\n  letter-spacing: 0.3rem;\n  word-spacing: 1rem;\n}\n\nsection.instructions {\n  font-family: $font-montserrat;\n  font-weight: 400;\n  font-size: 1.3rem;\n  word-spacing: 0.08rem;\n  color: lighten($tile-color, 10%);\n  background: lighten($tile-background, 0%);\n  padding: 10px 50px;\n  border-radius: 8px;\n\n  p {\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n  }\n}\n\nsection.instructions + section.game {\n  margin-top: 3rem;\n  padding: 1rem;\n}\n\nsection.game {\n  font-family: $font-droidsans;\n  background: lighten($tile-background, 20%);\n  padding: 1.43rem;\n  border-radius: $tile-border-radius;\n}\n\ncode {\n  padding: 2px 4px;\n  font-size: inherit;\n  color: $tile-color;\n  border-radius: 4px;\n  @include space-between($base-space-between / 4);\n}\n\n.drop-container {\n  position: relative;\n}\n\n@mixin tile($background-color: initial, $hover-background-color: $background-color, $color: initial, $width: initial, $height: initial, $margin: initial, $border: initial, $border-radius: initial, $font-size: inherit, $font-family: inherit, $font-weight: inherit, $hover-border: initial, $hover-color: initial) {\n    position: relative;\n    font-size: $font-size;\n    cursor: pointer;\n    font-family: $font-family;\n    font-weight: $font-weight;\n    color: $color;\n    width: $width;\n    height: $height;\n    margin: $margin;\n    border: $border;\n    border-radius: $border-radius;\n    background-color: $background-color;\n    transition: background-color $tile-transition-duration ease-out;\n    transition: font-size $tile-transition-duration ease-in-out;\n\n    &:hover {\n      background-color: $hover-background-color;\n      color: $hover-color;\n      border: $hover-border;\n    }\n}\n\n@mixin tile-inner($background-color, $color) {\n    @include center-via-transform-translate();\n    font-size: inherit;\n    font-weight: inherit;\n    background-color: $background-color;\n    color: $color;\n    transition: inherit;\n}\n.parenthesis-tile {\n  @include tile(\n  $font-size: $tile-font-size,\n  $font-family: $font-montserrat,\n  $font-weight: 400,\n  $width: 2rem,\n  $height: $tile-size,\n  $margin: $operator-space-between,\n  $border-radius: 35%,\n  $hover-color: darken(#879093, 25%)\n  );\n\n\n  .parenthesis {\n    @include tile-inner(\n    $background-color: transparent,\n    $color: $tile-color\n    );\n    cursor: default;\n  }\n}\n\n.operator-tile {\n  @include tile(\n  $hover-background-color: lighten(#879093, 30%),\n  $font-size: $tile-font-size,\n  $font-family: $font-montserrat,\n  $font-weight: 400,\n  $color: $operator-color,\n  $width: $operator-size,\n  $height: $operator-size,\n  $margin: $operator-space-between,\n  $border: $tile-border-width dashed transparent,\n  $border-radius: 50%,\n  $hover-border: $tile-border-width dashed lighten(#879093, 15%),\n  $hover-color: darken(#879093, 25%)\n  );\n\n  .operator {\n    @include tile-inner(\n    $background-color: transparent,\n    $color: $tile-color\n    );\n  }\n\n  &:hover .operator {\n   font-size: $tile-hover-font-size;\n   color: inherit;\n  }\n\n  &:active {\n    background: lighten(#879093, 15%);\n    border: $tile-border-width dashed lighten(#879093, 0%);\n\n    .operator {\n      font-size: $tile-hover-font-size * 1.2;\n    }\n  }\n}\n\n.number-tile {\n  @include space-between($tile-space-between);\n  @include tile(\n  $background-color: $tile-background,\n  $hover-background-color: $tile-hover-background,\n  $font-size: $tile-font-size,\n  $font-family: $font-montserrat,\n  $font-weight: 400,\n  $color: $tile-color,\n  $width: $tile-size,\n  $height: $tile-size,\n  $margin: $operator-space-between,\n  $border: $tile-border-width dashed transparent,\n  $border-radius: $tile-border-radius,\n  $hover-border: $tile-border-width dashed $tile-hover-border-color,\n  $hover-color: $tile-color\n  );\n\n  .number {\n    @include tile-inner(\n    $background-color: transparent,\n    $color: inherit\n    );\n  }\n\n  &:hover .number {\n    font-size: $tile-hover-font-size;\n    color: inherit;\n  }\n\n  &.swappable {\n    background-color: $tile-active-background;\n    border: $tile-border-width dashed darken($tile-active-background, 25%);\n    color: darken($tile-active-background, 70%);\n  }\n\n  &.enclosable {\n    background-color: $color-forest;\n    border: $tile-border-width dashed darken($color-forest, 25%);\n    color: darken($color-forest, 70%);\n  }\n}\n\n.equal-sign {\n  @include tile(\n  $background-color: transparent,\n  $font-size: $tile-font-size * 1.2,\n  $font-family: $font-montserrat,\n  $font-weight: 400,\n  $color: $tile-color,\n  $height: $tile-size,\n  $margin: 4.5rem,\n  $hover-color: $tile-color\n  );\n\n  .equals {\n    @include center-via-transform-translate();\n  }\n}\n\n.result-display {\n  @include tile(\n  $background-color: transparent,\n  $font-size: $tile-font-size * 1.2,\n  $font-family: $font-montserrat,\n  $font-weight: 400,\n  $color: $tile-color,\n  $height: $tile-size,\n  $margin: 2rem,\n  $hover-color: $tile-color\n  );\n\n  .result {\n    @include center-via-transform-translate();\n  }\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTIwOWQ1NTI4ZDRlMTc5OTU3OGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3NpdGUuc2Nzcz81ZjNhIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvc2l0ZS5zY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLG9CQUFPLENBQUMsQ0FBcUIsQ0FBQyxDQUFDOztBQUUvQixVQUFTLEdBQUcsR0FBRyxFQUFHOztBQUVsQixJQUFHLENBQUMsR0FBRyxHQUFHLFlBQVc7QUFDbkIsU0FBTSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0VBQzFCLEM7Ozs7OztBQ05EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQW1GO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNwQkE7QUFDQTtBQUNBLDhIQUE2SDtBQUM3SCw2R0FBNEc7O0FBRTVHO0FBQ0EsbUNBQWtDLHlDQUF5QyxFQUFFLGVBQWUsMEJBQTBCLGtCQUFrQixFQUFFLG9CQUFvQixrQ0FBa0MsMEJBQTBCLEVBQUUsdUJBQXVCLHFDQUFxQyw2QkFBNkIsRUFBRSxx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QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZEOztBQUVBLDhCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGUyMDlkNTUyOGQ0ZTE3OTk1NzhmXG4gKiovIiwicmVxdWlyZShcIi4uL3N0eWxlcy9zaXRlLnNjc3NcIik7XG5cbmZ1bmN0aW9uIEFwcCgpIHsgfVxuXG5BcHAucnVuID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5nYW1lID0gbmV3IEdhbWUoKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9hcHAuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vc2l0ZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vc2l0ZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi9zaXRlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc3R5bGVzL3NpdGUuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU1vbnRzZXJyYXQ6NDAwLDcwMHxEcm9pZCtTYW5zOjcwMCw0MDAsNjAwLDgwMCk7XCIsIFwiXCJdKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8rQ29uZGVuc2VkOjQwMCwzMDAsNzAwKTtcIiwgXCJcIl0pO1xuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5kZWJ1ZyB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBtYWdlbnRhICFpbXBvcnRhbnQ7IH1cXG5cXG4uZmxleGlibGUge1xcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgLmZsZXhpYmxlLnJvd3Mge1xcbiAgICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7IH1cXG4gIC5mbGV4aWJsZS5jb2x1bW5zIHtcXG4gICAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XFxuICAuZmxleGlibGUuaG9yaXpvbnRhbGx5LWNlbnRlcmVkIHtcXG4gICAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuZmxleGlibGUudmVydGljYWxseS1jZW50ZXJlZCB7XFxuICAgIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuLnB1bGwtbGVmdCB7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5wdWxsLXJpZ2h0IHtcXG4gIGZsb2F0OiByaWdodDsgfVxcblxcbi5jZW50ZXItYmxvY2sge1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uY2VudGVyZWQge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLm1hcmdpbmxlc3Mge1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLnBhZGRpbmdsZXNzIHtcXG4gIHBhZGRpbmc6IDA7IH1cXG5cXG4vKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82OTAwMzkyICovXFxuLnVuc2VsZWN0YWJsZSB7XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmRlZmF1bHQtY3Vyc29yIHtcXG4gIGN1cnNvcjogZGVmYXVsdDsgfVxcblxcbi51cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgfVxcblxcbi5sb3dlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTsgfVxcblxcbi5jYXBpdGFsaXplIHtcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplOyB9XFxuXFxuLmxhcmdlciB7XFxuICBmb250LXNpemU6IDE1MCU7IH1cXG5cXG4ubGFyZ2Uge1xcbiAgZm9udC1zaXplOiAxMjUlOyB9XFxuXFxuLyogVmFyaWFibGVzICovXFxuaHRtbCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDsgfVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjsgfVxcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIGNvbG9yOiAjMzcyOTFhO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3JlbTtcXG4gIHdvcmQtc3BhY2luZzogMXJlbTsgfVxcblxcbnNlY3Rpb24uaW5zdHJ1Y3Rpb25zIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTW9udHNlcnJhdFxcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICB3b3JkLXNwYWNpbmc6IDAuMDhyZW07XFxuICBjb2xvcjogIzVhNDIyYjtcXG4gIGJhY2tncm91bmQ6ICNmMGU4ZTA7XFxuICBwYWRkaW5nOiAxMHB4IDUwcHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7IH1cXG4gIHNlY3Rpb24uaW5zdHJ1Y3Rpb25zIHAge1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTsgfVxcblxcbnNlY3Rpb24uaW5zdHJ1Y3Rpb25zICsgc2VjdGlvbi5nYW1lIHtcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxuICBwYWRkaW5nOiAxcmVtOyB9XFxuXFxuc2VjdGlvbi5nYW1lIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRHJvaWQgU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDEuNDNyZW07XFxuICBib3JkZXItcmFkaXVzOiA2cHg7IH1cXG5cXG5jb2RlIHtcXG4gIHBhZGRpbmc6IDJweCA0cHg7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxuICBjb2xvcjogIzM3MjkxYTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIG1hcmdpbi1sZWZ0OiAwLjEyNXJlbTtcXG4gIG1hcmdpbi1yaWdodDogMC4xMjVyZW07IH1cXG4gIGNvZGU6Zmlyc3QtY2hpbGQge1xcbiAgICBtYXJnaW4tbGVmdDogMDsgfVxcbiAgY29kZTpsYXN0LWNoaWxkIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuXFxuLmRyb3AtY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5wYXJlbnRoZXNpcy10aWxlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtc2l6ZTogNC41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogaW5pdGlhbDtcXG4gIHdpZHRoOiAycmVtO1xcbiAgaGVpZ2h0OiAxMHJlbTtcXG4gIG1hcmdpbjogMC41cmVtO1xcbiAgYm9yZGVyOiBpbml0aWFsO1xcbiAgYm9yZGVyLXJhZGl1czogMzUlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5pdGlhbDtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgNzVtcyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IGZvbnQtc2l6ZSA3NW1zIGVhc2UtaW4tb3V0OyB9XFxuICAucGFyZW50aGVzaXMtdGlsZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGluaXRpYWw7XFxuICAgIGNvbG9yOiAjNDk0ZjUxO1xcbiAgICBib3JkZXI6IGluaXRpYWw7IH1cXG4gIC5wYXJlbnRoZXNpcy10aWxlIC5wYXJlbnRoZXNpcyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG4gICAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogIzM3MjkxYTtcXG4gICAgdHJhbnNpdGlvbjogaW5oZXJpdDtcXG4gICAgY3Vyc29yOiBkZWZhdWx0OyB9XFxuXFxuLm9wZXJhdG9yLXRpbGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZm9udC1zaXplOiA0LjVyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LWZhbWlseTogXFxcIk1vbnRzZXJyYXRcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjODc5MDkzO1xcbiAgd2lkdGg6IDZyZW07XFxuICBoZWlnaHQ6IDZyZW07XFxuICBtYXJnaW46IDAuNXJlbTtcXG4gIGJvcmRlcjogNHB4IGRhc2hlZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGluaXRpYWw7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDc1bXMgZWFzZS1vdXQ7XFxuICB0cmFuc2l0aW9uOiBmb250LXNpemUgNzVtcyBlYXNlLWluLW91dDsgfVxcbiAgLm9wZXJhdG9yLXRpbGU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhkYWRiO1xcbiAgICBjb2xvcjogIzQ5NGY1MTtcXG4gICAgYm9yZGVyOiA0cHggZGFzaGVkICNhZmI1Yjc7IH1cXG4gIC5vcGVyYXRvci10aWxlIC5vcGVyYXRvciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG4gICAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogIzM3MjkxYTtcXG4gICAgdHJhbnNpdGlvbjogaW5oZXJpdDsgfVxcbiAgLm9wZXJhdG9yLXRpbGU6aG92ZXIgLm9wZXJhdG9yIHtcXG4gICAgZm9udC1zaXplOiA1LjE3NXJlbTtcXG4gICAgY29sb3I6IGluaGVyaXQ7IH1cXG4gIC5vcGVyYXRvci10aWxlOmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNhZmI1Yjc7XFxuICAgIGJvcmRlcjogNHB4IGRhc2hlZCAjODc5MDkzOyB9XFxuICAgIC5vcGVyYXRvci10aWxlOmFjdGl2ZSAub3BlcmF0b3Ige1xcbiAgICAgIGZvbnQtc2l6ZTogNi4yMXJlbTsgfVxcblxcbi5udW1iZXItdGlsZSB7XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtc2l6ZTogNC41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzM3MjkxYTtcXG4gIHdpZHRoOiAxMHJlbTtcXG4gIGhlaWdodDogMTByZW07XFxuICBtYXJnaW46IDAuNXJlbTtcXG4gIGJvcmRlcjogNHB4IGRhc2hlZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGU4ZTA7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDc1bXMgZWFzZS1vdXQ7XFxuICB0cmFuc2l0aW9uOiBmb250LXNpemUgNzVtcyBlYXNlLWluLW91dDsgfVxcbiAgLm51bWJlci10aWxlOmZpcnN0LWNoaWxkIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7IH1cXG4gIC5udW1iZXItdGlsZTpsYXN0LWNoaWxkIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuICAubnVtYmVyLXRpbGU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThkYmNmO1xcbiAgICBjb2xvcjogIzM3MjkxYTtcXG4gICAgYm9yZGVyOiA0cHggZGFzaGVkICNjN2E4ODk7IH1cXG4gIC5udW1iZXItdGlsZSAubnVtYmVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcbiAgICBmb250LXdlaWdodDogaW5oZXJpdDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICB0cmFuc2l0aW9uOiBpbmhlcml0OyB9XFxuICAubnVtYmVyLXRpbGU6aG92ZXIgLm51bWJlciB7XFxuICAgIGZvbnQtc2l6ZTogNS4xNzVyZW07XFxuICAgIGNvbG9yOiBpbmhlcml0OyB9XFxuICAubnVtYmVyLXRpbGUuc3dhcHBhYmxlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VhZjBmNTtcXG4gICAgYm9yZGVyOiA0cHggZGFzaGVkICM5NGIwY2M7XFxuICAgIGNvbG9yOiAjMjczZDUzOyB9XFxuICAubnVtYmVyLXRpbGUuZW5jbG9zYWJsZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMGNjYmI7XFxuICAgIGJvcmRlcjogNHB4IGRhc2hlZCAjN2Q5NTcyO1xcbiAgICBjb2xvcjogIzEwMTMwZjsgfVxcblxcbi5lcXVhbC1zaWduIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtc2l6ZTogNS40cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzM3MjkxYTtcXG4gIHdpZHRoOiBpbml0aWFsO1xcbiAgaGVpZ2h0OiAxMHJlbTtcXG4gIG1hcmdpbjogNC41cmVtO1xcbiAgYm9yZGVyOiBpbml0aWFsO1xcbiAgYm9yZGVyLXJhZGl1czogaW5pdGlhbDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciA3NW1zIGVhc2Utb3V0O1xcbiAgdHJhbnNpdGlvbjogZm9udC1zaXplIDc1bXMgZWFzZS1pbi1vdXQ7IH1cXG4gIC5lcXVhbC1zaWduOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiAjMzcyOTFhO1xcbiAgICBib3JkZXI6IGluaXRpYWw7IH1cXG4gIC5lcXVhbC1zaWduIC5lcXVhbHMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOyB9XFxuXFxuLnJlc3VsdC1kaXNwbGF5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtc2l6ZTogNS40cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzM3MjkxYTtcXG4gIHdpZHRoOiBpbml0aWFsO1xcbiAgaGVpZ2h0OiAxMHJlbTtcXG4gIG1hcmdpbjogMnJlbTtcXG4gIGJvcmRlcjogaW5pdGlhbDtcXG4gIGJvcmRlci1yYWRpdXM6IGluaXRpYWw7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgNzVtcyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IGZvbnQtc2l6ZSA3NW1zIGVhc2UtaW4tb3V0OyB9XFxuICAucmVzdWx0LWRpc3BsYXk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6ICMzNzI5MWE7XFxuICAgIGJvcmRlcjogaW5pdGlhbDsgfVxcbiAgLnJlc3VsdC1kaXNwbGF5IC5yZXN1bHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOyB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi8uL3NyYy9zcmMvc3R5bGVzL2hlbHBlcnMuc2Nzc1wiLFwiLy4vc3JjL3NyYy9zdHlsZXMvc2l0ZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUNBQXFDLEVBQ3RDOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLGNBQWMsRUFxQmY7RUF2QkQ7SUFLSSw0QkFBNEI7SUFDNUIsb0JBQW9CLEVBQ3JCO0VBUEg7SUFVSSwrQkFBK0I7SUFDL0IsdUJBQXVCLEVBQ3hCO0VBWkg7SUFlSSw0QkFBNEI7SUFDNUIsb0JBQW9CLEVBQ3JCO0VBakJIO0lBb0JJLGdDQUFnQztJQUNoQyx3QkFBd0IsRUFDekI7O0FBR0g7RUFDRSxZQUFZLEVBQ2I7O0FBRUQ7RUFDRSxhQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxlQUFlLEVBQ2hCOztBQUVEO0VBQ0UsbUJBQW1CLEVBQ3BCOztBQUVEO0VBQ0ksVUFBVSxFQUNiOztBQUVEO0VBQ0ksV0FBVyxFQUNkOztBQUVELHdDQUF3QztBQUN4QztFQUNFLDRCQUE0QjtFQUM1QiwwQkFBMEI7RUFDMUIseUJBQXlCO0VBQ3pCLHVCQUF1QjtFQUN2QixzQkFBc0I7RUFDdEIsa0JBQWtCLEVBQ25COztBQUVEO0VBQ0UsZ0JBQWdCLEVB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QW5Cd1IsRUFvQnpSO0VBbUlMO0lEN0pFLG1CQUFtQjtJQUNuQixTQUFTO0lBQ1QsVUFBVTtJQUNWLDZDQUFzQyxFQ3dLckNcIixcImZpbGVcIjpcInNpdGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuZGVidWcge1xcbiAgYm9yZGVyOiAxcHggc29saWQgbWFnZW50YSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZmxleGlibGUge1xcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcbiAgZGlzcGxheTogZmxleDtcXG5cXG4gICYucm93cyB7XFxuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIH1cXG5cXG4gICYuY29sdW1ucyB7XFxuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG5cXG4gICYuaG9yaXpvbnRhbGx5LWNlbnRlcmVkIHtcXG4gICAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgJi52ZXJ0aWNhbGx5LWNlbnRlcmVkIHtcXG4gICAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxufVxcblxcbi5wdWxsLWxlZnQge1xcbiAgZmxvYXQ6IGxlZnQ7XFxufVxcblxcbi5wdWxsLXJpZ2h0IHtcXG4gIGZsb2F0OiByaWdodDtcXG59XFxuXFxuLmNlbnRlci1ibG9jayB7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuXFxuLmNlbnRlcmVkIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm1hcmdpbmxlc3Mge1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbi5wYWRkaW5nbGVzcyB7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY5MDAzOTIgKi9cXG4udW5zZWxlY3RhYmxlIHtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbi5kZWZhdWx0LWN1cnNvciB7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi51cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLmxvd2VyY2FzZSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xcbn1cXG5cXG4uY2FwaXRhbGl6ZSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XFxuXFxuLmxhcmdlciB7XFxuICBmb250LXNpemU6IDE1MCU7XFxufVxcblxcbi5sYXJnZSB7XFxuICBmb250LXNpemU6IDEyNSU7XFxufVxcblxcbkBtaXhpbiBjZW50ZXItdmlhLXRyYW5zZm9ybS10cmFuc2xhdGUoKSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO1xcbn1cXG5cXG5AbWl4aW4gc3BhY2UtYmV0d2VlbigkdmFsdWUpIHtcXG4gIG1hcmdpbi1sZWZ0OiAkdmFsdWUgLyAyO1xcbiAgbWFyZ2luLXJpZ2h0OiAkdmFsdWUgLyAyO1xcblxcbiAgJjpmaXJzdC1jaGlsZCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcblxcbiAgJjpsYXN0LWNoaWxkIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgfVxcbn1cIixcIkBpbXBvcnQgXFxcImhlbHBlcnNcXFwiO1xcbkBpbXBvcnQgXFxcImZvbnRzXFxcIjtcXG5cXG4vKiBWYXJpYWJsZXMgKi9cXG4kZm9udC1tb250c2VycmF0OiAnTW9udHNlcnJhdCcsIHNhbnMtc2VyaWY7XFxuJGZvbnQtZHJvaWRzYW5zOiAnRHJvaWQgU2FucycsIHNhbnMtc2VyaWY7XFxuJGZvbnQtcm9ib3RvOiAnUm9ib3RvIENvbmRlbnNlZCcsIHNhbnMtc2VyaWY7XFxuJGNvbG9yLXdvb2Q6ICNlZGUzZDk7XFxuJGNvbG9yLXdvb2QtaW52ZXJ0OiBpbnZlcnQoJGNvbG9yLXdvb2QpO1xcbiRjb2xvci1tYXJibGU6ICM5NTk3YTE7XFxuJGNvbG9yLWZlcm46ICNhMmIxYTY7XFxuJGNvbG9yLWZvcmVzdDogI2MwY2NiYjtcXG5cXG4kYmFzZS1mb250OiAkZm9udC1tb250c2VycmF0O1xcbiRiYXNlLWZvbnQtc2l6ZTogMTRweDtcXG4kYmFzZS1zcGFjZS1iZXR3ZWVuOiAxcmVtO1xcblxcbiR0aWxlLXRyYW5zaXRpb24tZHVyYXRpb246IDc1bXM7XFxuXFxuJHRpbGUtYmFja2dyb3VuZDogbGlnaHRlbigkY29sb3Itd29vZCwgMiUpO1xcbiR0aWxlLWNvbG9yOiBkYXJrZW4oJHRpbGUtYmFja2dyb3VuZCwgNzUlKTtcXG4kdGlsZS1zaXplOiAxMHJlbTtcXG4kdGlsZS1mb250LXNpemU6ICR0aWxlLXNpemUgKiAwLjQ1O1xcbiR0aWxlLWJvcmRlci13aWR0aDogNHB4O1xcbiR0aWxlLWJvcmRlci1yYWRpdXM6IDZweDtcXG4kdGlsZS1zcGFjZS1iZXR3ZWVuOiAkYmFzZS1zcGFjZS1iZXR3ZWVuICogMjtcXG4kdGlsZS1ob3Zlci1iYWNrZ3JvdW5kOiBkYXJrZW4oJHRpbGUtYmFja2dyb3VuZCwgNSUpO1xcbiR0aWxlLWhvdmVyLWJvcmRlci1jb2xvcjogZGFya2VuKCR0aWxlLWJhY2tncm91bmQsIDI1JSk7XFxuJHRpbGUtaG92ZXItZm9udC1zaXplOiAkdGlsZS1mb250LXNpemUgKiAxLjE1O1xcbiR0aWxlLWFjdGl2ZS1iYWNrZ3JvdW5kOiBsaWdodGVuKGludmVydCgkdGlsZS1jb2xvciksIDEwJSk7XFxuXFxuJG9wZXJhdG9yLXNpemU6IDZyZW07XFxuJG9wZXJhdG9yLWNvbG9yOiAjODc5MDkzO1xcbiRvcGVyYXRvci1zcGFjZS1iZXR3ZWVuOiAkYmFzZS1zcGFjZS1iZXR3ZWVuIC8gMjtcXG5cXG4qIHtcXG59XFxuXFxuaHRtbCB7XFxuICBmb250LXNpemU6ICRiYXNlLWZvbnQtc2l6ZTtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAkYmFzZS1mb250O1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDRyZW07XFxuICBjb2xvcjogJHRpbGUtY29sb3I7XFxuICBsZXR0ZXItc3BhY2luZzogMC4zcmVtO1xcbiAgd29yZC1zcGFjaW5nOiAxcmVtO1xcbn1cXG5cXG5zZWN0aW9uLmluc3RydWN0aW9ucyB7XFxuICBmb250LWZhbWlseTogJGZvbnQtbW9udHNlcnJhdDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIHdvcmQtc3BhY2luZzogMC4wOHJlbTtcXG4gIGNvbG9yOiBsaWdodGVuKCR0aWxlLWNvbG9yLCAxMCUpO1xcbiAgYmFja2dyb3VuZDogbGlnaHRlbigkdGlsZS1iYWNrZ3JvdW5kLCAwJSk7XFxuICBwYWRkaW5nOiAxMHB4IDUwcHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuXFxuICBwIHtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxuICB9XFxufVxcblxcbnNlY3Rpb24uaW5zdHJ1Y3Rpb25zICsgc2VjdGlvbi5nYW1lIHtcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG5zZWN0aW9uLmdhbWUge1xcbiAgZm9udC1mYW1pbHk6ICRmb250LWRyb2lkc2FucztcXG4gIGJhY2tncm91bmQ6IGxpZ2h0ZW4oJHRpbGUtYmFja2dyb3VuZCwgMjAlKTtcXG4gIHBhZGRpbmc6IDEuNDNyZW07XFxuICBib3JkZXItcmFkaXVzOiAkdGlsZS1ib3JkZXItcmFkaXVzO1xcbn1cXG5cXG5jb2RlIHtcXG4gIHBhZGRpbmc6IDJweCA0cHg7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxuICBjb2xvcjogJHRpbGUtY29sb3I7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBAaW5jbHVkZSBzcGFjZS1iZXR3ZWVuKCRiYXNlLXNwYWNlLWJldHdlZW4gLyA0KTtcXG59XFxuXFxuLmRyb3AtY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuQG1peGluIHRpbGUoJGJhY2tncm91bmQtY29sb3I6IGluaXRpYWwsICRob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvciwgJGNvbG9yOiBpbml0aWFsLCAkd2lkdGg6IGluaXRpYWwsICRoZWlnaHQ6IGluaXRpYWwsICRtYXJnaW46IGluaXRpYWwsICRib3JkZXI6IGluaXRpYWwsICRib3JkZXItcmFkaXVzOiBpbml0aWFsLCAkZm9udC1zaXplOiBpbmhlcml0LCAkZm9udC1mYW1pbHk6IGluaGVyaXQsICRmb250LXdlaWdodDogaW5oZXJpdCwgJGhvdmVyLWJvcmRlcjogaW5pdGlhbCwgJGhvdmVyLWNvbG9yOiBpbml0aWFsKSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQ7XFxuICAgIGNvbG9yOiAkY29sb3I7XFxuICAgIHdpZHRoOiAkd2lkdGg7XFxuICAgIGhlaWdodDogJGhlaWdodDtcXG4gICAgbWFyZ2luOiAkbWFyZ2luO1xcbiAgICBib3JkZXI6ICRib3JkZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAkdGlsZS10cmFuc2l0aW9uLWR1cmF0aW9uIGVhc2Utb3V0O1xcbiAgICB0cmFuc2l0aW9uOiBmb250LXNpemUgJHRpbGUtdHJhbnNpdGlvbi1kdXJhdGlvbiBlYXNlLWluLW91dDtcXG5cXG4gICAgJjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGhvdmVyLWJhY2tncm91bmQtY29sb3I7XFxuICAgICAgY29sb3I6ICRob3Zlci1jb2xvcjtcXG4gICAgICBib3JkZXI6ICRob3Zlci1ib3JkZXI7XFxuICAgIH1cXG59XFxuXFxuQG1peGluIHRpbGUtaW5uZXIoJGJhY2tncm91bmQtY29sb3IsICRjb2xvcikge1xcbiAgICBAaW5jbHVkZSBjZW50ZXItdmlhLXRyYW5zZm9ybS10cmFuc2xhdGUoKTtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcbiAgICBmb250LXdlaWdodDogaW5oZXJpdDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XFxuICAgIGNvbG9yOiAkY29sb3I7XFxuICAgIHRyYW5zaXRpb246IGluaGVyaXQ7XFxufVxcbi5wYXJlbnRoZXNpcy10aWxlIHtcXG4gIEBpbmNsdWRlIHRpbGUoXFxuICAkZm9udC1zaXplOiAkdGlsZS1mb250LXNpemUsXFxuICAkZm9udC1mYW1pbHk6ICRmb250LW1vbnRzZXJyYXQsXFxuICAkZm9udC13ZWlnaHQ6IDQwMCxcXG4gICR3aWR0aDogMnJlbSxcXG4gICRoZWlnaHQ6ICR0aWxlLXNpemUsXFxuICAkbWFyZ2luOiAkb3BlcmF0b3Itc3BhY2UtYmV0d2VlbixcXG4gICRib3JkZXItcmFkaXVzOiAzNSUsXFxuICAkaG92ZXItY29sb3I6IGRhcmtlbigjODc5MDkzLCAyNSUpXFxuICApO1xcblxcblxcbiAgLnBhcmVudGhlc2lzIHtcXG4gICAgQGluY2x1ZGUgdGlsZS1pbm5lcihcXG4gICAgJGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50LFxcbiAgICAkY29sb3I6ICR0aWxlLWNvbG9yXFxuICAgICk7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gIH1cXG59XFxuXFxuLm9wZXJhdG9yLXRpbGUge1xcbiAgQGluY2x1ZGUgdGlsZShcXG4gICRob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGVuKCM4NzkwOTMsIDMwJSksXFxuICAkZm9udC1zaXplOiAkdGlsZS1mb250LXNpemUsXFxuICAkZm9udC1mYW1pbHk6ICRmb250LW1vbnRzZXJyYXQsXFxuICAkZm9udC13ZWlnaHQ6IDQwMCxcXG4gICRjb2xvcjogJG9wZXJhdG9yLWNvbG9yLFxcbiAgJHdpZHRoOiAkb3BlcmF0b3Itc2l6ZSxcXG4gICRoZWlnaHQ6ICRvcGVyYXRvci1zaXplLFxcbiAgJG1hcmdpbjogJG9wZXJhdG9yLXNwYWNlLWJldHdlZW4sXFxuICAkYm9yZGVyOiAkdGlsZS1ib3JkZXItd2lkdGggZGFzaGVkIHRyYW5zcGFyZW50LFxcbiAgJGJvcmRlci1yYWRpdXM6IDUwJSxcXG4gICRob3Zlci1ib3JkZXI6ICR0aWxlLWJvcmRlci13aWR0aCBkYXNoZWQgbGlnaHRlbigjODc5MDkzLCAxNSUpLFxcbiAgJGhvdmVyLWNvbG9yOiBkYXJrZW4oIzg3OTA5MywgMjUlKVxcbiAgKTtcXG5cXG4gIC5vcGVyYXRvciB7XFxuICAgIEBpbmNsdWRlIHRpbGUtaW5uZXIoXFxuICAgICRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCxcXG4gICAgJGNvbG9yOiAkdGlsZS1jb2xvclxcbiAgICApO1xcbiAgfVxcblxcbiAgJjpob3ZlciAub3BlcmF0b3Ige1xcbiAgIGZvbnQtc2l6ZTogJHRpbGUtaG92ZXItZm9udC1zaXplO1xcbiAgIGNvbG9yOiBpbmhlcml0O1xcbiAgfVxcblxcbiAgJjphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGVuKCM4NzkwOTMsIDE1JSk7XFxuICAgIGJvcmRlcjogJHRpbGUtYm9yZGVyLXdpZHRoIGRhc2hlZCBsaWdodGVuKCM4NzkwOTMsIDAlKTtcXG5cXG4gICAgLm9wZXJhdG9yIHtcXG4gICAgICBmb250LXNpemU6ICR0aWxlLWhvdmVyLWZvbnQtc2l6ZSAqIDEuMjtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4ubnVtYmVyLXRpbGUge1xcbiAgQGluY2x1ZGUgc3BhY2UtYmV0d2VlbigkdGlsZS1zcGFjZS1iZXR3ZWVuKTtcXG4gIEBpbmNsdWRlIHRpbGUoXFxuICAkYmFja2dyb3VuZC1jb2xvcjogJHRpbGUtYmFja2dyb3VuZCxcXG4gICRob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiAkdGlsZS1ob3Zlci1iYWNrZ3JvdW5kLFxcbiAgJGZvbnQtc2l6ZTogJHRpbGUtZm9udC1zaXplLFxcbiAgJGZvbnQtZmFtaWx5OiAkZm9udC1tb250c2VycmF0LFxcbiAgJGZvbnQtd2VpZ2h0OiA0MDAsXFxuICAkY29sb3I6ICR0aWxlLWNvbG9yLFxcbiAgJHdpZHRoOiAkdGlsZS1zaXplLFxcbiAgJGhlaWdodDogJHRpbGUtc2l6ZSxcXG4gICRtYXJnaW46ICRvcGVyYXRvci1zcGFjZS1iZXR3ZWVuLFxcbiAgJGJvcmRlcjogJHRpbGUtYm9yZGVyLXdpZHRoIGRhc2hlZCB0cmFuc3BhcmVudCxcXG4gICRib3JkZXItcmFkaXVzOiAkdGlsZS1ib3JkZXItcmFkaXVzLFxcbiAgJGhvdmVyLWJvcmRlcjogJHRpbGUtYm9yZGVyLXdpZHRoIGRhc2hlZCAkdGlsZS1ob3Zlci1ib3JkZXItY29sb3IsXFxuICAkaG92ZXItY29sb3I6ICR0aWxlLWNvbG9yXFxuICApO1xcblxcbiAgLm51bWJlciB7XFxuICAgIEBpbmNsdWRlIHRpbGUtaW5uZXIoXFxuICAgICRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCxcXG4gICAgJGNvbG9yOiBpbmhlcml0XFxuICAgICk7XFxuICB9XFxuXFxuICAmOmhvdmVyIC5udW1iZXIge1xcbiAgICBmb250LXNpemU6ICR0aWxlLWhvdmVyLWZvbnQtc2l6ZTtcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxuICB9XFxuXFxuICAmLnN3YXBwYWJsZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR0aWxlLWFjdGl2ZS1iYWNrZ3JvdW5kO1xcbiAgICBib3JkZXI6ICR0aWxlLWJvcmRlci13aWR0aCBkYXNoZWQgZGFya2VuKCR0aWxlLWFjdGl2ZS1iYWNrZ3JvdW5kLCAyNSUpO1xcbiAgICBjb2xvcjogZGFya2VuKCR0aWxlLWFjdGl2ZS1iYWNrZ3JvdW5kLCA3MCUpO1xcbiAgfVxcblxcbiAgJi5lbmNsb3NhYmxlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWZvcmVzdDtcXG4gICAgYm9yZGVyOiAkdGlsZS1ib3JkZXItd2lkdGggZGFzaGVkIGRhcmtlbigkY29sb3ItZm9yZXN0LCAyNSUpO1xcbiAgICBjb2xvcjogZGFya2VuKCRjb2xvci1mb3Jlc3QsIDcwJSk7XFxuICB9XFxufVxcblxcbi5lcXVhbC1zaWduIHtcXG4gIEBpbmNsdWRlIHRpbGUoXFxuICAkYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQsXFxuICAkZm9udC1zaXplOiAkdGlsZS1mb250LXNpemUgKiAxLjIsXFxuICAkZm9udC1mYW1pbHk6ICRmb250LW1vbnRzZXJyYXQsXFxuICAkZm9udC13ZWlnaHQ6IDQwMCxcXG4gICRjb2xvcjogJHRpbGUtY29sb3IsXFxuICAkaGVpZ2h0OiAkdGlsZS1zaXplLFxcbiAgJG1hcmdpbjogNC41cmVtLFxcbiAgJGhvdmVyLWNvbG9yOiAkdGlsZS1jb2xvclxcbiAgKTtcXG5cXG4gIC5lcXVhbHMge1xcbiAgICBAaW5jbHVkZSBjZW50ZXItdmlhLXRyYW5zZm9ybS10cmFuc2xhdGUoKTtcXG4gIH1cXG59XFxuXFxuLnJlc3VsdC1kaXNwbGF5IHtcXG4gIEBpbmNsdWRlIHRpbGUoXFxuICAkYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQsXFxuICAkZm9udC1zaXplOiAkdGlsZS1mb250LXNpemUgKiAxLjIsXFxuICAkZm9udC1mYW1pbHk6ICRmb250LW1vbnRzZXJyYXQsXFxuICAkZm9udC13ZWlnaHQ6IDQwMCxcXG4gICRjb2xvcjogJHRpbGUtY29sb3IsXFxuICAkaGVpZ2h0OiAkdGlsZS1zaXplLFxcbiAgJG1hcmdpbjogMnJlbSxcXG4gICRob3Zlci1jb2xvcjogJHRpbGUtY29sb3JcXG4gICk7XFxuXFxuICAucmVzdWx0IHtcXG4gICAgQGluY2x1ZGUgY2VudGVyLXZpYS10cmFuc2Zvcm0tdHJhbnNsYXRlKCk7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIndlYnBhY2s6Ly9cIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Nhc3MtbG9hZGVyP3NvdXJjZU1hcCEuL3NyYy9zdHlsZXMvc2l0ZS5zY3NzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=