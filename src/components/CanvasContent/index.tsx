import React, { useContext } from 'react';
import { EditorContext } from '@/pages/Editor';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import { Resizable, ResizableBox } from 'react-resizable';
import DragWrap from '../DragWrap';
import ComponentRender from '../ComponentRender';

import styles from './index.less';
import 'react-resizable/css/styles.css';
import { DndContext } from '@dnd-kit/core';
import Draggable from '../Draggable';
import LayoutWrap from '../LayoutWrap';

// 画布主内容
export default function CanvasContent(props) {
  const [state, dispatch] = useContext(EditorContext);
  function onDrop(event: React.DragEvent) {
    const componentConfig = JSON.parse(
      event.dataTransfer.getData('componentConfig'),
    );
    componentConfig.componentId = event.dataTransfer.getData('componentId');
    dispatch({
      type: 'ADD_COMPONMENT',
      payload: {
        componentConfig: {
          ...componentConfig,
          layout: {
            ...componentConfig?.layout,
            left: event?.clientX,
            top: event?.clientY,
          },
        },
      },
    });
  }
  const { componmentList = [], activedComponentId = '' } = state;

  const selectComponent = (curComponentConfig) => {
    const { componentId } = curComponentConfig;
    dispatch({
      type: 'SELECT_COMPONENT',
      payload: {
        componentId,
      },
    });
  };

  function handleCmpDragEnd(data) {
    console.log(data);
    const {
      active: {
        data: {
          current: { layout },
        },
      },
    } = data;
    const { left = 0, top = 0 } = layout || {};
    dispatch({
      type: 'UPDATE_COMPONENT_LAYOUT',
      payload: {
        componentId: data?.active?.id,
        layoutConfig: {
          left: left + data?.delta?.x,
          top: top + data?.delta?.y,
        },
      },
    });
  }

  function handleCmpResize(componentConfig, size) {
    dispatch({
      type: 'UPDATE_COMPONENT_LAYOUT',
      payload: {
        componentId: componentConfig?.componentId,
        layoutConfig: {
          ...size,
        },
      },
    });
  }

  return (
    <div
      className={styles['main']}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className={styles['canvas-wrap']} id="canvas-wrap">
        <DndContext onDragEnd={handleCmpDragEnd}>
          {componmentList.map((componentConfig) => {
            return (
              <Resizable
                width={
                  componentConfig?.layout?.width
                    ? componentConfig?.layout?.width
                    : 200
                }
                height={
                  componentConfig?.layout?.height
                    ? componentConfig?.layout?.height
                    : 200
                }
                onResize={(e, { size }) => {
                  e.stopPropagation();
                  handleCmpResize(componentConfig, size);
                }}
              >
                <div
                  className="test"
                  style={{
                    width: componentConfig?.layout?.width + 'px',
                    height: componentConfig?.layout?.height + 'px',
                    left: `${componentConfig?.layout?.left}px`,
                    top: `${componentConfig?.layout?.top}px`,
                  }}
                >
                  <Draggable
                    id={componentConfig.componentId}
                    data={componentConfig}
                  >
                    <AlignReferenceLine
                      onClick={() => selectComponent(componentConfig)}
                      actived={
                        activedComponentId === componentConfig?.componentId
                      }
                      {...componentConfig}
                    >
                      <EditSideToolbar>
                        <ComponentRender {...componentConfig} />
                      </EditSideToolbar>
                    </AlignReferenceLine>
                  </Draggable>
                </div>
              </Resizable>
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
