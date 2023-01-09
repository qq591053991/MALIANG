import React from 'react';
import styles from '../CanvasContent/index.less';

interface iProps {
  children: React.ReactElement;
}

// 布局参考对齐辅助线
export default function AlignReferenceLine(props: iProps) {
  const { children } = props;
  return <div className={styles['align-reference-lien-wrap']}>{children}</div>;
}
