import React from 'react';
import styles from '../CanvasContent/index.less';

interface iProps {
  children: React.ReactElement;
  actived: Boolean;
  style?: React.CSSProperties;
  onClick: (event: React.MouseEvent) => void;
}

// 布局参考对齐辅助线
export default function AlignReferenceLine(props: iProps) {
  const { children, onClick, actived, style = {} } = props;
  return (
    <div
      onClick={(e) => onClick?.(e)}
      className={actived ? 'actived' : 'test-align'}
      style={{
        height: '100%',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
