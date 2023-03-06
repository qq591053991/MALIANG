import { restrictToBoundingRect } from '@/utils';
import { uuid } from '@/utils/tool';
import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Moveable, { MoveableProps, OnResize } from 'react-moveable';
import styles from './index.less';

interface iMoveableWrapProps {
  children: ReactNode;
  componentConfig: Record<string, any>;
  componentList: Record<string, any>[];
  width?: number;
  height?: number;
  unit: number;
  actived: boolean;
  nativeOnClick: MouseEventHandler<HTMLDivElement>;
  mode: 'preview' | 'editor';
}

function boundParent() {
  const containerBox = document.getElementById('canvasBox');
  if (!containerBox) {
    return {};
  }
  const containerRect = {
    left: 0,
    top: 0,
    width: containerBox?.clientWidth || 0,
    height: containerBox?.clientHeight || 0,
    right: containerBox?.clientWidth || 0,
    bottom: containerBox?.clientHeight || 0,
  };
  return containerRect;
}

export default function MoveableWrap(
  props: MoveableProps & iMoveableWrapProps,
) {
  const {
    mode,
    unit,
    children,
    componentConfig,
    componentList = [],
    actived,
    nativeOnClick,
    ...moveableProps
  } = props;
  const { config = {}, componentId } = componentConfig;
  const { height, width, left, top, opacity = 1, zIndex = 1 } = config;

  const unitLine = useMemo(() => {
    const result = [];
    for (let i = 0; i < 99; i++) {
      result[i] = (i + 1) * unit;
    }
    return result;
  }, [unit]);

  const [target, setTarget] = useState<Element>();
  const [elementGuidelines, setElementGuidelines] = useState<Element[]>([]);

  useEffect(() => {
    setTarget(document.querySelector(`.target-${componentId}`)!);
    setElementGuidelines([...document.querySelectorAll('.target')]);
  }, [componentList.length]);

  return (
    <>
      <div
        className={`
        target-${componentId}
        target ${styles['target']}
        ${mode === 'preview' ? styles['preview'] : ''}
        `}
        style={{
          height,
          width,
          zIndex,
          opacity,
          transform: `translate(${left}px,${top}px)`,
        }}
        onClick={nativeOnClick}
      >
        {children}
      </div>
      <Moveable
        className={`moveable-test ${actived ? 'actived' : ''}`}
        target={target}
        elementGuidelines={elementGuidelines}
        snappable={true}
        verticalGuidelines={unitLine}
        horizontalGuidelines={unitLine}
        snapThreshold={5}
        isDisplaySnapDigit={true}
        snapGap={true}
        snapDirections={{ top: true, right: true, bottom: true, left: true }}
        elementSnapDirections={{
          top: true,
          right: true,
          bottom: true,
          left: true,
        }}
        snapDigit={0}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={false}
        resizable={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        bounds={boundParent()}
        hideDefaultLines={false}
        {...moveableProps}
      />
    </>
  );
}
