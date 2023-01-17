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
        // left: `${data?.config?.left}px`,
        // top: `${data?.config?.top}px`,
      }
    : {
        // left: `${data?.config?.left}px`,
        // top: `${data?.config?.top}px`,
      };
  return (
    <Element
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        position: 'relative',
        // height: '100%',
        // width: '100%',
        ...style,
        width: data?.config?.width ? data?.config?.width : 200,
        height: data?.config?.height ? data?.config?.height : 200,
      }}
    >
      {props.children}
    </Element>
  );
}
