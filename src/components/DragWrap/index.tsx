import React from 'react';
import Draggable from 'react-draggable';
import styles from './index.less';

// 拖拽层组件，只添加可拖拽移动特性
export default function DragWrap(props) {
  const { children } = props;
  const parentWidth = document.getElementById('canvas-wrap')?.clientWidth;

  return (
    <Draggable
      bounds={{
        right: parentWidth - 22,
      }}
    >
      <div className={styles.dragWrap}>{children}</div>
    </Draggable>
  );
}
