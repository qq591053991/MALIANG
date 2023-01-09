import React from 'react';
import Draggable from 'react-draggable';
import styles from './index.less';

// 拖拽层组件，只添加可拖拽移动特性
export default function DragWrap(props) {
  const { children } = props;
  const parentWrap = document.querySelector('#canvasBox');
  return (
    <div className={styles.dragWrap}>
      <Draggable
        bounds={{
          right: parentWrap?.clientWidth,
          bottom: parentWrap?.clientHeight,
        }}
      >
        <div>{children}</div>
      </Draggable>
    </div>
  );
}
