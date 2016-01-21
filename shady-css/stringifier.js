(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './common', './node-visitor'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./common'), require('./node-visitor'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.common, global.nodeVisitor);
    global.stringifier = mod.exports;
  }
})(this, function (exports, _common, _nodeVisitor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stringifier = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Stringifier = function (_NodeVisitor) {
    _inherits(Stringifier, _NodeVisitor);

    function Stringifier() {
      _classCallCheck(this, Stringifier);

      return _possibleConstructorReturn(this, _NodeVisitor.apply(this, arguments));
    }

    Stringifier.prototype.stringify = function stringify(ast) {
      return this.visit(ast) || '';
    };

    Stringifier.prototype[_common.nodeType.stylesheet] = function (stylesheet) {
      var rules = '';

      for (var i = 0; i < stylesheet.rules.length; ++i) {
        rules += this.visit(stylesheet.rules[i]);
      }

      return rules;
    };

    Stringifier.prototype[_common.nodeType.atRule] = function (atRule) {
      return '@' + atRule.name + (atRule.parameters ? ' ' + atRule.parameters : '') + (atRule.rulelist ? '' + this.visit(atRule.rulelist) : ';');
    };

    Stringifier.prototype[_common.nodeType.rulelist] = function (rulelist) {
      var rules = '{';

      for (var i = 0; i < rulelist.rules.length; ++i) {
        rules += this.visit(rulelist.rules[i]);
      }

      return rules + '}';
    };

    Stringifier.prototype[_common.nodeType.comment] = function (comment) {
      return '' + comment.value;
    };

    Stringifier.prototype[_common.nodeType.ruleset] = function (ruleset) {
      return '' + ruleset.selector + this.visit(ruleset.rulelist);
    };

    Stringifier.prototype[_common.nodeType.declaration] = function (declaration) {
      return declaration.name + ':' + this.visit(declaration.value) + ';';
    };

    Stringifier.prototype[_common.nodeType.expression] = function (expression) {
      return '' + expression.text;
    };

    Stringifier.prototype[_common.nodeType.discarded] = function (discarded) {
      return '';
    };

    return Stringifier;
  }(_nodeVisitor.NodeVisitor);

  exports.Stringifier = Stringifier;
});