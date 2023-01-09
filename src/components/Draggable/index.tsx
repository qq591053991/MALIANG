import React, { useEffect } from 'react';
import { useDraggable, DndContext } from '@dnd-kit/core';

export default function Draggable(props) {
  const { id, data } = props;
  const Element = props.element || 'div';
  const dragState = useDraggable({
    id,
    data,
  });
  const { transform, attributes, listeners, setNodeRef } = dragState;
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        // left: `${data?.layout?.left}px`,
        // top: `${data?.layout?.top}px`,
      }
    : {
        // left: `${data?.layout?.left}px`,
        // top: `${data?.layout?.top}px`,
      };
  return (
    <Element
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        ...style,
      }}
    >
      {props.children}
    </Element>
  );
}
