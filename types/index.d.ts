import React from 'react';
export declare type FormRenderProps = {
    layoutData: Item[];
    data: Record<string, unknown>;
    setData: (p: unknown) => void;
};
export declare type Item = {
    type?: React.ComponentType | string;
    name: string;
    description?: string;
    label?: string;
    render?: () => React.ReactElement;
    getJSON?: () => Item | null;
    elProps?: Record<string, unknown>;
    cellProps?: Record<string, unknown>;
    [p: string]: unknown;
};
export default function FormRenderer({ layoutData, data, setData, }: FormRenderProps): React.ReactElement;
