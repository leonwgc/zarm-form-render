# zarm-form-render

使用js对象配置，开发zarm表单.

## 安装

 [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save zarm-form-render
    $ yarn add zarm-form-render

## 代码示例

```jsx
import React, { useState } from 'react';
import FormRenderer from 'zarm-form-render';
import { Input, Cell, Radio, Select, DateSelect, Button } from 'zarm';
import 'zarm/dist/zarm.css';

type FormProps = {
  name?: string;
  gender?: string;
  food?: string;
  birthday?: string;
  mobile?: string;
};

export default function App(): React.ReactElement {
  const [data, setData] = useState<FormProps>({
    name: '',
    gender: '',
    food: 'banana',
    birthday: '',
    mobile: '',
  });

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
                setData((d) => ({ ...d, gender: value as string }));
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
      name: 'food',
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

```jsx
export declare type FormRenderProps = {
    /** 表单布局配置 */
    layoutData: Item[];
    /** 数据存储,Item name作为key,组件值为value */
    data: Record<string, unknown>;
    /** 数据更新, 通常来自 react hooks, [data,setData]=useState({}) */
    setData: (data: Record<string, unknown>) => void;
};
export declare type Item = {
    /**
     * 组件类型，比如Input,Button,"input",
     * 组件默认都会添加value和onChange属性用于接受/更新数据，
     * 如果默认的不符需求，请在elProps自行定义
     */
    type?: React.ComponentType | string;
    /** 组件值保存在data的键名,  */
    name?: string;
    /** 设置标题区域内容 */
    label?: ReactNode;
    /**  设置描述区域内容  */
    description?: ReactNode;
    /** 自定义渲染 */
    render?: () => ReactNode;
    /** 动态返回Item，优先级高于render */
    getJSON?: () => Item | null;
    /** 组件props,会透传给type定义的组件 */
    elProps?: Record<string, unknown>;
    /** Cell其他属性,会透传给Cell */
    cellProps?: Record<string, unknown>;
    /** 其他属性，透传到组件 */
    [otherProps: string]: unknown;
};

/**
 * zarm表单渲染组件
 *
 * @export
 * @param {FormRenderProps} props
 * @return {*}  {React.ReactElement}
 */
export default function FormRenderer(props: FormRenderProps): React.ReactElement;
```


yarn start / npm start 查看demo
