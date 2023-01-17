import React, { useEffect } from 'react';
import { useDraggable, DndContext } from '@dnd-kit/core';
import { ResizableBox } from 'react-resizable';

export default function configWrap(props) {
  const { id, data, children, onResizeStop } = props;
  const Element = children;
  const dragState = useDraggable({
    id,
    data,
  });
  const { transform, attributes, listeners, setNodeRef } = dragState;
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        left: `${data?.config?.left}px`,
        top: `${data?.config?.top}px`,
      }
    : {
        transform: `translate3d(${data?.config?.left}px, ${data?.config?.top}px, 0)`,
        left: `${data?.config?.left}px`,
        top: `${data?.config?.top}px`,
      };

  return (
    <ResizableBox
      width={200 || data?.config?.width}
      height={200 || data?.config?.height}
      onResizeStop={onResizeStop}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        position: 'absolute',
        ...style,
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </ResizableBox>
  );
}
