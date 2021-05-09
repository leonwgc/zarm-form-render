import React from 'react';
import { Cell, Radio, DateSelect, Select } from 'zarm';

export type FormRenderProps = {
  layoutData: Item[]; // 表单布局配置
  data: Record<string, unknown>; // 数据存储,Item name作为key,组件值为value
  setData: (p: unknown) => void; // 数据更新, 通常来自 react hooks, [data,setData]=useState({})
};

export type Item = {
  type?: React.ComponentType | string; // 组件类型， 比如Input 等
  name: string; // Cell name
  items?: Array<unknown>; // zarm dataSource
  description?: string; // Cell description
  label?: string; // Cell title
  render?: () => React.ReactNode;
  getJSON?: () => Item | null; // 动态返回Item配置
  elProps?: Record<string, unknown>; // 组件的props配置 , 比如type为Input, elProps则会配置到Input
  cellProps?: Record<string, unknown>; // cell props配置
  [p: string]: unknown;
};

// 对于无法配置(比如自定义组件，需要根据条件显示的组件等)的情况， 请使用render方法，

// getJSON() 动态返回js配置
// render()  自定义render任何react node

const typeMapping = {
  'Radio.Group': Radio.Group,
  'Select': Select,
  'DateSelect': DateSelect,
};

export default function FormRenderer({
  layoutData,
  data,
  setData,
}: FormRenderProps): React.ReactNode {
  const onFiledChange = (name: string, value: unknown) => {
    let v = value;

    // for Select ctrl
    if (Array.isArray(value)) {
      v = value.map((item) => item.value)[0];
    }

    setData({ ...data, [name]: v });
  };
  const onChangeFactory = (name: string) => (value: unknown) => onFiledChange(name, value);

  return (
    <div className="renderer">
      {layoutData.map((item, idx) => {
        if (typeof item.getJSON === 'function') {
          item = item.getJSON();
        }
        if (typeof item !== 'object' || !item) return null;
        const {
          label,
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
          return <React.Fragment key={idx}> {render()}</React.Fragment>;
        }

        let children: React.ReactNode[] = [];
        if (type === Radio.Group || type === 'Radio.Group') {
          children = items.map(
            (it: { value: string | number | undefined; label: string }, idx1) => (
              <Radio value={it.value} key={idx1}>
                {it.label}
              </Radio>
            )
          );
        }

        props.value = data[name];
        props.onChange = onChangeFactory(name);

        if (type === Select || type === 'Select') {
          props.dataSource = items;
        }
        if (type === DateSelect || type === Select || type === 'Select' || type === 'DateSelect') {
          props.onOk = props.onChange;
          delete props.onChange;
          props.onChange = elProps.onChange;
        }

        return (
          <Cell key={idx} title={label} description={description} {...cellProps}>
            {React.createElement(
              typeof type === 'string' ? typeMapping[type] || 'span' : type,
              { ...props, ...elProps } as React.Attributes,
              ...children
            )}
          </Cell>
        );
      })}
    </div>
  );
}
