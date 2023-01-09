import React from 'react';
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Draggable from 'react-draggable';
import { v4 as uuid } from 'uuid';
import styles from './index.less';

const id = uuid();

// 拖拽层组件，只添加可拖拽移动特性
export default function DragWrap(props) {
  const { children } = props;
  const parentWidth = document.getElementById('canvas-wrap')?.clientWidth;
  const dragState = useDraggable({
    id,
  });
  const { attributes, listeners, setNodeRef, transform } = dragState;
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  // return (
  //   <Draggable
  //     bounds={{
  //       right: parentWidth - 22,
  //     }}
  //   >
  //     <div className={styles.dragWrap}>{children}</div>
  //   </Draggable>
  // );
  return (
    <DragOverlay>
      <div
        className={styles.dragWrap}
        style={{
          ...style,
        }}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        {children}
      </div>
    </DragOverlay>
  );
}
