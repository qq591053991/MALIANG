import React from 'react';
import styles from '../CanvasContent/index.less';

interface iProps {
  children: React.ReactElement;
}

// 画布中的组件侧边辅助栏工具
export default function EditSideToolbar(props: iProps) {
  const { children } = props;
  return <div className={styles['side-toobar-wrap']}>{children}</div>;
}
