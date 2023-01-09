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
  return (
    <div className={styles.dragWrap}>
      <Draggable bounds={'#canvasBox'}>
        <div>{children}</div>
      </Draggable>
    </div>
  );
}
