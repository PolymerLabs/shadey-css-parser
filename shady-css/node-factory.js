(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './common'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./common'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.common);
    global.nodeFactory = mod.exports;
  }
})(this, function (exports, _common) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NodeFactory = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NodeFactory = function () {
    function NodeFactory() {
      _classCallCheck(this, NodeFactory);
    }

    NodeFactory.prototype.stylesheet = function stylesheet(rules) {
      return {
        type: _common.nodeType.stylesheet,
        rules: rules
      };
    };

    NodeFactory.prototype.atRule = function atRule(name, parameters, rulelist) {
      return {
        type: _common.nodeType.atRule,
        name: name,
        parameters: parameters,
        rulelist: rulelist
      };
    };

    NodeFactory.prototype.comment = function comment(value) {
      return {
        type: _common.nodeType.comment,
        value: value
      };
    };

    NodeFactory.prototype.rulelist = function rulelist(rules) {
      return {
        type: _common.nodeType.rulelist,
        rules: rules
      };
    };

    NodeFactory.prototype.ruleset = function ruleset(selector, rulelist) {
      return {
        type: _common.nodeType.ruleset,
        selector: selector,
        rulelist: rulelist
      };
    };

    NodeFactory.prototype.declaration = function declaration(name, value) {
      return {
        type: _common.nodeType.declaration,
        name: name,
        value: value
      };
    };

    NodeFactory.prototype.expression = function expression(text) {
      return {
        type: _common.nodeType.expression,
        text: text
      };
    };

    NodeFactory.prototype.discarded = function discarded(text) {
      return {
        type: _common.nodeType.discarded,
        text: text
      };
    };

    return NodeFactory;
  }();

  exports.NodeFactory = NodeFactory;
});