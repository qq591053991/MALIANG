import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { EditorContext } from '@/pages/Editor';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import { Resizable, ResizableBox } from 'react-resizable';
import DragWrap from '../DragWrap';
import Calibration from '../Calibration';
import { throttle } from '@/utils/tool';
import { debounce } from 'lodash';
import ComponentRender from '../ComponentRender';
import MoveableWrap from '../MoveableWrap';

import styles from './index.less';
import Ruler from '@scena/react-ruler';
import { useScroll } from 'ahooks';
// import 'react-resizable/css/styles.css';

// 画布主内容
export default function CanvasContent(props) {
  const [state, dispatch] = useContext(EditorContext);
  const { componentList = [], canvasConfig, curComponentConfig = {} } = state;
  const { mode } = state;
  const [scaleNum, setScale] = useState(1);
  const [dragstate, setDragState] = useState({ x: 0, y: 0 });
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });

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
          config: {
            ...componentConfig?.config,
            left: event?.clientX - 350,
            top: event?.clientY - 50,
            zIndex: componentList?.length + 1,
          },
        },
      },
    });
  }

  const selectCanvas = () => {
    dispatch({
      type: 'SELECT_CANVAS',
    });
  };

  const selectComponent = (curComponentConfig: Record<string, any>) => {
    dispatch({
      type: 'SELECT_COMPONENT',
      payload: {
        componentConfig: curComponentConfig,
      },
    });
  };

  const onCopy = () => {
    dispatch({
      type: 'COPY_COMPONENT',
      payload: {
        componentConfig: curComponentConfig,
      },
    });
  };

  const onDelete = () => {
    dispatch({
      type: 'DELETE_COMPONENT',
      payload: {
        componentConfig: curComponentConfig,
      },
    });
  };

  // 拖拽结束后组件更新布局坐标位置
  function updateLayout(
    componentId: string,
    layoutConfig: Record<string, any>,
  ) {
    dispatch({
      type: 'UPDATE_COMPONENT_LAYOUT',
      payload: {
        componentId: componentId,
        layoutConfig,
      },
    });
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const hRulerRef = useRef(null);
  const vRulerRef = useRef(null);
  const scroll = useScroll(containerRef);

  const mousedownfn = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const mousemovefn = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const mouseupfn = () => {
    setDiffMove({
      start: { x: 0, y: 0 },
      move: false,
    });
  };

  const onwheelFn = (e: React.WheelEvent<HTMLDivElement>) => {
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

  //数据大屏自适应函数
  const handleScreenAuto = () => {
    if (mode !== 'preview') {
      return;
    }
    const canvasDraftWidth = canvasConfig?.width; //画布的宽度
    const canvasDraftHeight = canvasConfig?.height; //画布的高度

    //根据屏幕的变化适配的比例
    let scale = document.documentElement.clientWidth / canvasDraftWidth;
    if (document.documentElement.clientHeight < canvasDraftHeight * scale) {
      // 减去垂直滚动条宽度  */
      scale = document.documentElement.clientWidth / (canvasDraftWidth + 8);
    }
    //缩放比例
    (
      document.querySelector('#canvasBox') as any
    ).style.transform = `scale3d(${scale},${scale},1)`;
  };

  useEffect(() => {
    //初始化自适应  ----在刚显示的时候就开始适配一次
    handleScreenAuto();
    //绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = () => handleScreenAuto();
    //退出大屏后自适应消失   ---这是react的组件销毁生命周期，如果你是vue则写在deleted中。最好在退出大屏的时候接触自适应
    return () => {
      window.onresize = null;
    };
  }, [canvasConfig]);

  // useEffect(() => {
  //   if (diffmove.move && containerRef && containerRef.current && containerRef.current.style) {
  //     containerRef.current.style.cursor = 'move';
  //   } else {
  //     containerRef.current.style.cursor = 'default';
  //   }
  // }, [diffmove.move]);

  if (mode === 'preview') {
    return (
      <div className={`${styles['main']} ${styles['preview']}`}>
        <div
          className={styles.canvasBox}
          id="canvasBox"
          style={{
            ...canvasConfig,
          }}
        >
          {componentList.map((componentConfig) => {
            return (
              <MoveableWrap componentConfig={componentConfig} mode={mode}>
                <ComponentRender {...componentConfig} />
              </MoveableWrap>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles['main']}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      onClick={(e) => {
        e.stopPropagation();
        selectCanvas();
      }}
    >
      <div
        className={styles.tickMark}
        id="calibration"
        ref={containerRef}
        onMouseDown={mousedownfn}
        onMouseMove={throttle(mousemovefn, 100)}
        onMouseUp={mouseupfn}
        onMouseLeave={mouseupfn}
        onWheel={onwheelFn}
      >
        <div
          style={{
            width: '5000px',
            height: '3000px',
          }}
        >
          <div className={styles.cover}></div>
          <div className={styles.tickMarkTop}>
            <Ruler
              ref={hRulerRef}
              type="horizontal"
              shortLineSize={3}
              longLineSize={5}
              textOffset={[0, 10]}
              zoom={1}
              scrollPos={scroll?.left - 30}
            />
          </div>
          <div className={styles.tickMarkLeft}>
            <Ruler
              ref={vRulerRef}
              type="vertical"
              shortLineSize={3}
              longLineSize={5}
              textOffset={[10, 0]}
              zoom={1}
              scrollPos={scroll?.top - 30}
            />
          </div>
          <div
            className={styles.canvasBox}
            id="canvasBox"
            style={{
              ...canvasConfig,
            }}
          >
            {componentList.map((componentConfig) => {
              return (
                <MoveableWrap
                  componentConfig={componentConfig}
                  actived={
                    componentConfig.componentId ===
                    curComponentConfig?.componentId
                  }
                  onDrag={(e) => {
                    e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
                  }}
                  nativeOnClick={(e) => {
                    e.stopPropagation();
                    selectComponent(componentConfig);
                  }}
                  onDragStart={(e) => {
                    selectComponent(componentConfig);
                  }}
                  onDragEnd={({ lastEvent }) => {
                    if (!lastEvent) return;
                    const { beforeTranslate } = lastEvent;
                    updateLayout(componentConfig.componentId, {
                      left: beforeTranslate[0],
                      top: beforeTranslate[1],
                    });
                  }}
                  onResize={(e) => {
                    const beforeTranslate = e.drag.beforeTranslate;
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                  }}
                  onResizeEnd={({ lastEvent }) => {
                    if (!lastEvent) return;
                    const { beforeTranslate } = lastEvent.drag;
                    updateLayout(componentConfig.componentId, {
                      height: lastEvent.height,
                      width: lastEvent.width,
                      left: beforeTranslate[0],
                      top: beforeTranslate[1],
                    });
                  }}
                >
                  <EditSideToolbar
                    actived={
                      componentConfig.componentId ===
                      curComponentConfig?.componentId
                    }
                    onCopy={onCopy}
                    onDelete={onDelete}
                  >
                    <ComponentRender {...componentConfig} />
                  </EditSideToolbar>
                </MoveableWrap>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
