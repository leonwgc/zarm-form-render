# zarm-form-render

简单使用 javascript 对象配置，实现 Zarm 表单开发. 已服务于多个生产项目。

## 安装

用 npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save zarm-form-render
    $ yarn add zarm-form-render

## 代码示例

```jsx
import React, { useState, useEffect } from 'react';
import FormRenderer from 'zarm-form-render';
import { Input, Cell, Radio, Select, DateSelect, Button, Toast, Panel } from 'zarm';
import './App.less';

export default function App() {
  const [data, setData] = useState({});

  const layoutData = [
    {
      type: Input,
      label: '被保人姓名',
      placeholder: '请填写',
      name: 'name',
    },
    {
      render() {
        return data.name ? <Cell title="你填了">{data.name}</Cell> : null;
      },
    },
    {
      render() {
        return (
          <Cell title="性别">
            <Radio.Group
              type="button"
              value={data.gender}
              onChange={(value) => {
                setData((d) => ({ ...d, gender: value }));
              }}
            >
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </Radio.Group>
          </Cell>
        );
      },
    },
    {
      render() {
        if (!data.gender) {
          return null;
        }
        return <div className={`${data.gender}`} />;
      },
    },
    {
      render() {
        if (!data.gender) return null;
        return <Cell title="你是" description={data.gender === 'male' ? '男生' : '女生'}></Cell>;
      },
    },
    {
      type: Select,
      label: '爱吃的水果',
      name: 'favfood',
      elProps: {
        dataSource: [
          { label: 'apple', value: 'apple' },
          { label: 'banana', value: 'banana' },
        ],
      },
    },

    {
      type: DateSelect,
      label: '出生日期',
      title: '被保人出生日期',
      placeholder: '请选择',
      name: 'birthday',
      min: '1900-01-01',
      elProps: {
        onOk(value) {
          setData((d) => ({ ...d, birthday: value }));
        },
      },
    },
    {
      type: Input,
      label: '手机号',
      placeholder: '请填写',
      name: 'mobile',
    },
    {
      render() {
        return (
          <Button block theme="primary" onClick={() => alert(JSON.stringify(data))}>
            确定
          </Button>
        );
      },
    },
  ];

  return (
    <div className="app">
      <FormRenderer layoutData={layoutData} data={data} setData={setData} />
    </div>
  );
}
```

配置项目说明

```javascript
export type FormRenderProps = {
  layoutData: Item[], // 表单布局配置
  data: Record<string, unknown>, // 数据存储,Item name作为key,组件值为value
  setData: (p: unknown) => void, // 数据更新, 通常来自 react hooks, [data,setData]=useState({})
};

export type Item = {
  type?: React.ComponentType | string, // 组件类型， 比如Input 等
  name: string, // Cell name
  description?: string, // Cell description
  label?: string, // Cell title
  render?: () => React.ReactNode,
  getJSON?: () => Item | null, // 动态返回Item配置
  elProps?: Record<string, unknown>, // 组件的props配置 , 比如type为Input, elProps则会配置到Input
  cellProps?: Record<string, unknown>, // cell props配置
};
```

```

 可以自己运行示例， yarn start / npm start 查看demo

 ![demo1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9426fb899bcc476bb8c7dc6b00c57cc7~tplv-k3u1fbpfcp-watermark.image)
```
