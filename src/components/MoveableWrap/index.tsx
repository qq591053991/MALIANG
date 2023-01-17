import { restrictToBoundingRect } from '@/utils';
import { uuid } from '@/utils/tool';
import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import Moveable, { MoveableProps, OnResize } from 'react-moveable';
import styles from './index.less';

interface iMoveableWrapProps {
  children: ReactNode;
  componentConfig: Record<string, any>;
  width?: number;
  height?: number;
  actived: boolean;
  nativeOnClick: MouseEventHandler<HTMLDivElement>;
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
    children,
    componentConfig,
    actived,
    nativeOnClick,
    ...moveableProps
  } = props;
  const [target, setTarget] = useState<Element>();
  const [elementGuidelines, setElementGuidelines] = useState<Element[]>([]);

  useEffect(() => {
    setTarget(document.querySelector(`.target-${componentId}`)!);
    setElementGuidelines([document.querySelector('.target')]);
  }, []);
  const { config, componentId } = componentConfig;
  const { height, width, left, top } = config;
  return (
    <>
      <div
        className={`target-${componentId} target ${styles['target']}`}
        style={{
          height,
          width,
          transform: `transform3d(${left},${top})`,
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
        verticalGuidelines={[0, 200, 400]}
        horizontalGuidelines={[0, 200, 400]}
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
