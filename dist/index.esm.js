import React from 'react';
import { Cell } from 'zarm';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var _excluded = ["label", "name", "type", "description", "elProps", "cellProps", "render"];

/**
 * zarm表单渲染组件
 *
 * @export
 * @param {FormRenderProps} props
 * @return {*}  {React.ReactNode}
 */
function FormRenderer(props) {
  var layoutData = props.layoutData,
      data = props.data,
      setData = props.setData;

  var onFiledChange = function onFiledChange(name, value) {
    var v = value; // for Select ctrl

    if (Array.isArray(value)) {
      v = value.map(function (item) {
        return item.value;
      })[0];
    }

    setData(_objectSpread2(_objectSpread2({}, data), {}, _defineProperty({}, name, v)));
  };

  var onChangeFactory = function onChangeFactory(name) {
    return function (value) {
      return onFiledChange(name, value);
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "zarm-form-renderer"
  }, layoutData.map(function (item, idx) {
    if (typeof item.getJSON === 'function') {
      item = item.getJSON();
    }

    if (_typeof(item) !== 'object' || !item) return null;

    var _item = item,
        label = _item.label,
        name = _item.name,
        type = _item.type,
        description = _item.description,
        _item$elProps = _item.elProps,
        elProps = _item$elProps === void 0 ? {} : _item$elProps,
        _item$cellProps = _item.cellProps,
        cellProps = _item$cellProps === void 0 ? {} : _item$cellProps,
        render = _item.render,
        props = _objectWithoutProperties(_item, _excluded);

    if (typeof render === 'function') {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: idx
      }, " ", render());
    }

    props.value = data[name];
    props.onChange = onChangeFactory(name);
    return /*#__PURE__*/React.createElement(Cell, _extends({
      key: idx,
      title: label,
      description: description
    }, cellProps), /*#__PURE__*/React.createElement(type, _objectSpread2(_objectSpread2({}, props), elProps)));
  }));
}

export default FormRenderer;
