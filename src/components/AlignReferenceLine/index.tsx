import React from 'react';

interface iProps {
  children: React.ReactElement;
  actived: Boolean;
  onClick: (event: React.MouseEvent) => void;
}

// 布局参考对齐辅助线
export default function AlignReferenceLine(props: iProps) {
  const { children, onClick, actived } = props;
  console.log(actived);
  return (
    <div onClick={onClick} className={actived ? '' : ''}>
      {children}
    </div>
  );
}
