import React from 'react';


interface iProps {
    children: React.ReactElement
}

// 画布中的组件侧边辅助栏工具
export default function EditSideToolbar(props: iProps) {
    const { children } = props
    return <div>
        {children}
    </div>;
}
