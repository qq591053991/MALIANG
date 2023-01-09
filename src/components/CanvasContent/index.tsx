import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { EditorContext } from '@/pages/Editor';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import { Resizable, ResizableBox } from 'react-resizable';
import DragWrap from '../DragWrap';
import Calibration from '../Calibration';
import { throttle } from '@/utils/tool';
import ComponentRender from '../ComponentRender';

import styles from './index.less';
import 'react-resizable/css/styles.css';
import { DndContext } from '@dnd-kit/core';
import Draggable from '../Draggable';
import LayoutWrap from '../LayoutWrap';

// 画布主内容
export default function CanvasContent(props) {
  const [state, dispatch] = useContext(EditorContext);
  const [scaleNum, setScale] = useState(1);
  const [dragstate, setDragState] = useState({ x: 0, y: 0 });

  const handleSlider = useMemo(() => {
    return (type: any) => {
      if (type) {
        setScale((prev: number) => +(prev + 0.1).toFixed(1));
      } else {
        setScale((prev: number) => +(prev - 0.1).toFixed(1));
      }
    };
  }, []);

  const backSize = () => {
    setScale(1);
    setDragState({ x: 0, y: 0 });
  };
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });
  const mousedownfn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          move: true,
        });
      }
    };
  }, []);

  const mousemovefn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffmove.move) {
        let diffx: number;
        let diffy: number;
        const newX = e.clientX;
        const newY = e.clientY;
        diffx = newX - diffmove.start.x;
        diffy = newY - diffmove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY,
          },
          move: true,
        });
        setDragState((prev) => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy,
          };
        });
      }
    };
  }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  const mouseupfn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false,
      });
    };
  }, []);

  const onwheelFn = useMemo(() => {
    return (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY < 0) {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y + 40,
        }));
      } else {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y - 40,
        }));
      }
    };
  }, []);

  useEffect(() => {
    if (diffmove.move && containerRef.current) {
      containerRef.current.style.cursor = 'move';
    } else {
      containerRef.current!.style.cursor = 'default';
    }
  }, [diffmove.move]);

  return (
    <div
      className={styles['main']}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <div
        className={styles.tickMark}
        id="calibration"
        ref={containerRef}
        onMouseDown={mousedownfn}
        onMouseMove={throttle(mousemovefn, 500)}
        onMouseUp={mouseupfn}
        onMouseLeave={mouseupfn}
        onWheel={onwheelFn}
      >
        <div className={styles.tickMarkTop}>
          <Calibration direction="up" id="calibrationUp" multiple={scaleNum} />
        </div>
        <div className={styles.tickMarkLeft}>
          <Calibration
            direction="right"
            id="calibrationRight"
            multiple={scaleNum}
          />
        </div>
        {/* <SourceBox
          dragState={dragstate}
          setDragState={setDragState}
          scaleNum={scaleNum}
          canvasId={canvasId}
          allType={allType}
        />
        <CanvasControl scaleNum={scaleNum} handleSlider={handleSlider} backSize={backSize} /> */}
        <div className={styles.canvasBox} id="canvasBox">
          {/* <div className={styles['canvas-wrap']} id="canvas-wrap"> */}
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
                      width: componentConfig?.layout?.width ?? 200 + 'px',
                      height: componentConfig?.layout?.height ?? 200 + 'px',
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
