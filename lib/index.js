"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormRenderer;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _zarm = require("zarm");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// 对于无法配置(比如自定义组件，需要根据条件显示的组件等)的情况， 请使用render方法，
// getJSON() 动态返回js配置
// render()  自定义render任何react node
var typeMapping = {
  'Radio.Group': _zarm.Radio.Group,
  'Select': _zarm.Select,
  'DateSelect': _zarm.DateSelect
};

function FormRenderer(_ref) {
  var layoutData = _ref.layoutData,
      data = _ref.data,
      setData = _ref.setData;

  var onFiledChange = function onFiledChange(name, value) {
    var v = value; // for Select ctrl

    if (Array.isArray(value)) {
      v = value.map(function (item) {
        return item.value;
      })[0];
    }

    setData(_objectSpread(_objectSpread({}, data), {}, (0, _defineProperty2["default"])({}, name, v)));
  };

  var onChangeFactory = function onChangeFactory(name) {
    return function (value) {
      return onFiledChange(name, value);
    };
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "renderer"
  }, layoutData.map(function (item, idx) {
    if (typeof item.getJSON === 'function') {
      item = item.getJSON();
    }

    if ((0, _typeof2["default"])(item) !== 'object' || !item) return null;
    var _item = item,
        label = _item.label,
        name = _item.name,
        type = _item.type,
        description = _item.description,
        items = _item.items,
        _item$elProps = _item.elProps,
        elProps = _item$elProps === void 0 ? {} : _item$elProps,
        _item$cellProps = _item.cellProps,
        cellProps = _item$cellProps === void 0 ? {} : _item$cellProps,
        render = _item.render,
        props = (0, _objectWithoutProperties2["default"])(_item, ["label", "name", "type", "description", "items", "elProps", "cellProps", "render"]);

    if (typeof render === 'function') {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
        key: idx
      }, " ", render());
    }

    var children = [];

    if (type === _zarm.Radio.Group || type === 'Radio.Group') {
      children = items.map(function (it, idx1) {
        return /*#__PURE__*/_react["default"].createElement(_zarm.Radio, {
          value: it.value,
          key: idx1
        }, it.label);
      });
    }

    props.value = data[name];
    props.onChange = onChangeFactory(name);

    if (type === _zarm.Select || type === 'Select') {
      props.dataSource = items;
    }

    if (type === _zarm.DateSelect || type === _zarm.Select || type === 'Select' || type === 'DateSelect') {
      props.onOk = props.onChange;
      delete props.onChange;
      props.onChange = elProps.onChange;
    }

    return /*#__PURE__*/_react["default"].createElement(_zarm.Cell, (0, _extends2["default"])({
      key: idx,
      title: label,
      description: description
    }, cellProps), /*#__PURE__*/_react["default"].createElement.apply(_react["default"], [typeof type === 'string' ? typeMapping[type] || 'span' : type, _objectSpread(_objectSpread({}, props), elProps)].concat((0, _toConsumableArray2["default"])(children))));
  }));
}