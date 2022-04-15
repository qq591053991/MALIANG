import React from 'react';


interface iProps {
  children: React.ReactElement
}

// 布局参考对齐辅助线
export default function AlignReferenceLine(props: iProps) {
  const { children } = props
  return <div>
    {children}
  </div>;
}
