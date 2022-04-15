import React from 'react';
import Draggable from 'react-draggable';

// 拖拽层组件，只添加可拖拽移动特性
export default function DragWrap(props) {
  const { children } = props;
  return (
    <Draggable>
      <>{children}</>
    </Draggable>
  );
}
