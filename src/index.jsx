import React from 'react';
import { Cell, Radio, DateSelect, Select } from 'zarm';

// 对于无法配置(比如自定义组件，需要根据条件显示的组件等)的情况， 请使用render方法，

// getJSON() 动态返回json
// render()  自定义render

export default function FormRenderer({ layoutData, data, setData }) {
  const onFiledChange = (name, value) => {
    let v = value;

    // for Select ctrl
    if (Array.isArray(value)) {
      v = value.map((item) => item.value)[0];
    }

    setData({ ...data, [name]: v });
  };

  const onChangeFactory = (name) => (value) => onFiledChange(name, value);

  return (
    <div className="renderer">
      {layoutData.map((item, idx) => {
        if (typeof item.getJSON === 'function') {
          item = item.getJSON();
        }
        if (typeof item !== 'object' || !item) return null;
        const {
          name,
          type,
          description,
          items,
          elProps = {},
          cellProps = {},
          render,
          ...props
        } = item;

        if (typeof render === 'function') {
          return render();
        }

        let children = [];
        if (Array.isArray(items) && type === Radio.Group) {
          children = items.map((it, idx1) => (
            <Radio value={it.value} key={idx1}>
              {it.label}
            </Radio>
          ));
        }

        props.value = data[name];
        props.onChange = onChangeFactory(name);

        if (type === Select) {
          props.dataSource = items;
        }
        if (type === DateSelect || type === Select) {
          props.onOk = props.onChange;
          delete props.onChange;
          props.onChange = elProps.onChange;
        }

        return (
          <Cell key={idx} title={item.label} description={description} {...cellProps} name={name}>
            {React.createElement(type, { ...props, ...elProps }, ...children)}
          </Cell>
        );
      })}
    </div>
  );
}
