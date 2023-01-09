import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { EditorContext } from '@/pages/Editor';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import DragWrap from '../DragWrap';
import styles from './index.less';
import ComponmentRender from '../ComponmentRender';
import Calibration from '../Calibration';
import { throttle } from '@/utils/tool';

// 画布主内容
export default function CanvasContent(props) {
  const { dispatch, state } = useContext(EditorContext);
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
    const componmentConfig = JSON.parse(
      event.dataTransfer.getData('componmentConfig'),
    );
    componmentConfig.componmentId = event.dataTransfer.getData('componmentId');
    dispatch({
      type: 'ADD_COMPONMENT',
      payload: {
        componmentConfig,
      },
    });
  }
  const { componmentList } = state;

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
      className={styles.main}
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
          {componmentList.map((componmentConfig) => {
            return (
              <DragWrap>
                <AlignReferenceLine>
                  <EditSideToolbar>
                    <ComponmentRender {...componmentConfig} />
                  </EditSideToolbar>
                </AlignReferenceLine>
              </DragWrap>
            );
          })}
        </div>
      </div>
    </div>
  );
}
