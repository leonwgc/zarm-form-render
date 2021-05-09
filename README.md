# zarm-form-render

简单使用 javascript 对象配置，实现Zarm表单开发. 已服务于多个生产项目。

## 安装

 用npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:



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
      getJSON() {
        return data.name
          ? {
              type: Input,
              label: '你填了',
              description: data.name,
            }
          : null;
      },
    },
    {
      type: Radio.Group,
      label: '性别',
      name: 'gender',
      elProps: {
        type: 'button',
        ghost: true,
      },
      items: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
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
    },
    {
      type: Input,
      label: '手机号',
      placeholder: '请填写',
      name: 'mobile',
    },
    {
      render() {
        return <div style={{ margin: '30px 6px' }}></div>;
      },
    },
    {
      render() {
        return (
          <Panel title="你录入的内容">
            <div style={{ margin: '10px 6px' }}>{JSON.stringify(data)}</div>
          </Panel>
        );
      },
    },
  ];

  return (
    <div className="app">
      <FormRenderer layoutData={layoutData} data={data} setData={setData} />
      <Button block theme="primary" onClick={() => Toast.show(JSON.stringify(data))}>
        确定
      </Button>
    </div>
  );
}

```

配置项目说明
```javascript
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
};

```

下列三个组件, 请使用string格式的type , 或者直接复制src/index.tsx源码到工程避免这个问题
```javascript
const typeMapping = {
  'Radio.Group': Radio.Group,
  'Select': Select,
  'DateSelect': DateSelect,
};

```

 可以自己运行示例， yarn start / npm start 查看demo 

 ![demo1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9426fb899bcc476bb8c7dc6b00c57cc7~tplv-k3u1fbpfcp-watermark.image)
