import * as React from 'react';
export interface Item {
  type: React.Component; // 组件类型， 比如Input 等
  name: string; // Cell name
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
