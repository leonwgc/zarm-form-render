import React, { ReactNode } from 'react';
export declare type FormRenderProps = {
    /** 表单布局配置 */
    layoutData: Item[];
    /** 数据存储,Item name作为key,组件值为value */
    data: Record<string, unknown>;
    /** 数据更新, 通常来自 react hooks, [data,setData]=useState({}) */
    setData: (data: Record<string, unknown>) => void;
};
export declare type Item = {
    /** 组件类型，比如Input,Button,"input"  */
    type?: React.ComponentType | string;
    /** 组件值保存在data的键名,  */
    name: string;
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
 * @return {*}  {React.ReactNode}
 */
export default function FormRenderer(props: FormRenderProps): React.ReactNode;
