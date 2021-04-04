import React, { useState, useEffect } from 'react';
import FormRenderer from '../src';
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
    <div>
      <FormRenderer layoutData={layoutData} data={data} setData={setData} />
      <Button block theme="primary" onClick={() => Toast.show(JSON.stringify(data))}>
        确定
      </Button>
    </div>
  );
}
