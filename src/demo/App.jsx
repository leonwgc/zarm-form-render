import React, { useState, useEffect } from 'react';
import FormRenderer from '../index';
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
