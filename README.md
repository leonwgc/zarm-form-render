# zarm-form-render

简单使用 javascript 对象配置，实现Zarm表单开发. 已经在多个项目中使用。

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
        return (
          <Button block theme="primary" onClick={() => Toast.show(JSON.stringify(data))}>
            确定
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <FormRenderer layoutData={layoutData} data={data} setData={setData} />
    </div>
  );
}

```

配置项目说明
```javascript
import * as React from 'react';
export interface Item {
  type: React.Component; // 组件类型， 比如Input 等
  name: string; // Cell name,用作数据存储key
  items?: Array<any>; // dataSource
  description: string; // Cell description
  label?: string; // Cell title
  render?: () => React.ReactNode; //自定义 render
  getJSON?: () => object | null; // 动态返回Item配置
  elProps?: object; // 组件的props配置 , 比如type为Input, elProps则会配置到Input
  cellProps?: object; // cell props配置
}
export interface Props {
  layoutData: Array<Item>; // 表单布局配置
  data: object; // 数据存储,name作为key,内容为value
  setData: () => void; // 数据更新
}
interface FormRenderer extends React.FC<Props> {}
declare const FormRenderer: FormRenderer;
export default FormRenderer;

```

 可以运行示例， yarn start / npm start 查看demo ，效果如下
 
![zarm-demo.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4337af4981f4fc1a10c81a8376d6bf2~tplv-k3u1fbpfcp-watermark.image)
