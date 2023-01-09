import { binarySearchRemain } from '@/utils';
import React from 'react';
import { useMemo } from 'react';
import { getComponentRotatedStyle } from './calcRender';
import { marklineState, RealStyleType } from './state';

export interface MarklineConfigType {
  indent: number;
  isAbsorb: boolean;
  mode: 'normal' | 'grid';
  gridIndent: number;
  resizeIndent: number;
  marklineUnfocus: null | any[];
  borderColor: string;
  borderStyle: 'dotted' | 'solid' | 'dashed';
}

// 间隔距离执行吸附
export const marklineConfig: MarklineConfigType = {
  indent: 5,
  isAbsorb: true,
  mode: 'normal',
  gridIndent: 50,
  resizeIndent: 0,
  marklineUnfocus: null,
  borderColor: 'rgba( 33 , 150 , 243, 1 )',
  borderStyle: 'dotted',
};

export interface RealStyle {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface LinesTypes {
  x: number[];
  y: number[];
}

/**
 *
 * 第一次运算时需要
 * @export
 * @param {RealStyle} focusStyle
 * @param {RealStyle} unFocusStyle
 * @param {LinesTypes} lines
 * @param {IBlockType} focus
 */
export function newMarklineDisplay(
  focusStyle: RealStyle,
  unFocusStyle: RealStyle,
  lines: LinesTypes,
) {
  const { top, height, left, width } = focusStyle;
  const { top: t, height: h, left: l, width: w } = unFocusStyle;
  // 头对头
  if (Math.abs(t - top) <= 1) {
    lines.x.push(t);
  }
  // 尾对头
  else if (Math.abs(t - (top + height)) <= 1) {
    lines.x.push(t);
  }
  // 头对尾
  else if (Math.abs((t + h - top) / 2) <= 1) {
    lines.x.push(t + h);
  }
  // 尾对尾
  else if (Math.abs((t + h - top - height) / 2) <= 1) {
    lines.x.push(t + h);
  }
  // 纵线
  // 头对头
  if (Math.abs(l - left) <= 1) {
    lines.y.push(l);
  }
  // 尾对头
  else if (Math.abs(l - (left + width)) <= 1) {
    lines.y.push(l);
  }
  // 头对尾
  else if (Math.abs(l + w - left) <= 1) {
    lines.y.push(l + w);
  }
  // 尾对尾
  else if (Math.abs(l + w - left - width) <= 1) {
    lines.y.push(l + w);
  }
}

/**
 *
 *
 * @export 吸附间距之前已经算出，该函数直接做处理
 * @param {RealStyle} focusStyle
 * @param {RealStyle} unFocusStyle
 * @param {LinesTypes} lines
 * @param {any} focus
 * @param {number} diff 绝对值
 * @param {('left' | 'top' | 'bottom' | 'right' | 't-b' | 'b-t' |  'l-r' |  'r-l')} direction
 */
export function marklineDisplay(
  focusStyle: RealStyle,
  unFocusStyle: RealStyle,
  lines: LinesTypes,
  focus: any,
  diff: number,
  dirty: { dirtyX: boolean; dirtyY: boolean },
  direction:
    | 'left'
    | 'top'
    | 'bottom'
    | 'right'
    | 't-b'
    | 'b-t'
    | 'l-r'
    | 'r-l',
) {
  const { top, height, left, width } = focusStyle;
  const { top: t, height: h, left: l, width: w } = unFocusStyle;
  let diffY = 0;
  let diffX = 0;
  switch (direction) {
    case 'left':
      if (dirty.dirtyY) {
        if (diff <= 1) {
          lines.y.push(l);
        }
      } else {
        lines.y.push(l);
        diffX = l - left;
        dirty.dirtyY = true;
      }
      break;
    case 'right':
      if (dirty.dirtyY) {
        if (diff <= 1) {
          lines.y.push(l + w);
        }
      } else {
        lines.y.push(l + w);
        diffX = l + w - left - width;
        dirty.dirtyY = true;
      }
      break;
    case 'l-r':
      if (dirty.dirtyY) {
        if (diff <= 1) {
          lines.y.push(l + w);
        }
      } else {
        lines.y.push(l + w);
        diffX = l + w - left;
        dirty.dirtyY = true;
      }
      break;
    case 'r-l':
      if (dirty.dirtyY) {
        if (diff <= 1) {
          lines.y.push(l);
        }
      } else {
        lines.y.push(l);
        diffX = l - (left + width);
        dirty.dirtyY = true;
      }
      break;
    case 'top':
      if (dirty.dirtyX) {
        if (diff <= 1) {
          lines.x.push(t);
        }
      } else {
        lines.x.push(t);
        diffY = t - top;
        dirty.dirtyX = true;
      }
      break;
    case 'bottom':
      if (dirty.dirtyX) {
        if (diff <= 1) {
          lines.x.push(t + h);
        }
      } else {
        lines.x.push(t + h);
        diffY = t + h - top - height;
        dirty.dirtyX = true;
      }
      break;
    case 't-b':
      if (dirty.dirtyX) {
        if (diff <= 1) {
          lines.x.push(t + h);
        }
      } else {
        lines.x.push(t + h);
        diffY = t + h - top;
        dirty.dirtyX = true;
      }
      break;
    case 'b-t':
      if (dirty.dirtyX) {
        if (diff <= 1) {
          lines.x.push(t);
        }
      } else {
        lines.x.push(t);
        diffY = t - (top + height);
        dirty.dirtyX = true;
      }
      break;
  }
  if (marklineConfig.isAbsorb) {
    focus.top = Math.round(focus.top + diffY);
    focus.left = Math.round(focus.left + diffX);
  }
}

export function marklineCalRender(config: any): LinesTypes {
  const store = config.getStore();
  //focus可能好几个，做对比的是拖拽那个
  const lines: LinesTypes = { x: [], y: [] };

  // 这个被拷贝过，所以必须重新获取
  const focus = store.getData().block.find((v) => v.id === item?.id)!;

  if (!marklineConfig.marklineUnfocus) {
    marklineConfig.marklineUnfocus = store
      .getData()
      .block.filter((v) => v.id !== item?.id);
  }

  const left = focus.left;
  const top = focus.top;
  const rotate = focus.rotate.value;
  const width = focus.width;
  const height = focus.height;
  const realStyle = getComponentRotatedStyle(rotate, width, height, left, top);

  if (typeof left !== 'number' || typeof top !== 'number') {
    return lines; //可能没有这2值
  }
  const unfocus = marklineConfig.marklineUnfocus;
  const len = unfocus?.length;

  // 只要cache里有东西，说明有缓存
  if (marklineState.cache) {
    const focusItem = config.getFocusState();
    const isMulti = focusItem.blocks.length > 1;
    if (!isMulti) {
      if (!marklineState.sortLeft) {
        marklineState.sortLeft = Object.values(marklineState.cache).sort(
          (a, b) => {
            return a.left - b.left;
          },
        );
      }
      if (!marklineState.sortTop) {
        marklineState.sortTop = Object.values(marklineState.cache).sort(
          (a, b) => {
            return a.top - b.top;
          },
        );
      }
      if (!marklineState.sortBottom) {
        marklineState.sortBottom = Object.values(marklineState.cache).sort(
          (a, b) => {
            return a.bottom - b.bottom;
          },
        );
      }
      if (!marklineState.sortRight) {
        marklineState.sortRight = Object.values(marklineState.cache).sort(
          (a, b) => {
            return a.right - b.right;
          },
        );
      }
      // 划线的元素不应该冲突
      // 当横向或者纵向已经吸附过，则后续不进行吸附，差值为0则划线。
      // 未吸附过时的第一次划线会带吸附，后续按上述走
      const dirty = {
        dirtyX: false,
        dirtyY: false,
      };
      const indexLeft = binarySearchRemain<RealStyleType>(
        realStyle.left,
        marklineState.sortLeft,
        'left',
        marklineConfig.indent,
      );
      if (indexLeft) {
        marklineDisplay(
          realStyle,
          indexLeft[0],
          lines,
          focus,
          indexLeft[1],
          dirty,
          'left',
        );
      }
      const indexLeftRight = binarySearchRemain<RealStyleType>(
        realStyle.left,
        marklineState.sortRight,
        'right',
        marklineConfig.indent,
      );
      if (indexLeftRight) {
        marklineDisplay(
          realStyle,
          indexLeftRight[0],
          lines,
          focus,
          indexLeftRight[1],
          dirty,
          'l-r',
        );
      }
      const indexRightLeft = binarySearchRemain<RealStyleType>(
        realStyle.right,
        marklineState.sortLeft,
        'left',
        marklineConfig.indent,
      );
      if (indexRightLeft) {
        marklineDisplay(
          realStyle,
          indexRightLeft[0],
          lines,
          focus,
          indexRightLeft[1],
          dirty,
          'r-l',
        );
      }
      const indexTopBottom = binarySearchRemain<RealStyleType>(
        realStyle.top,
        marklineState.sortBottom,
        'bottom',
        marklineConfig.indent,
      );
      if (indexTopBottom) {
        marklineDisplay(
          realStyle,
          indexTopBottom[0],
          lines,
          focus,
          indexTopBottom[1],
          dirty,
          't-b',
        );
      }
      const indexBottomTop = binarySearchRemain<RealStyleType>(
        realStyle.bottom,
        marklineState.sortTop,
        'top',
        marklineConfig.indent,
      );
      if (indexBottomTop) {
        marklineDisplay(
          realStyle,
          indexBottomTop[0],
          lines,
          focus,
          indexBottomTop[1],
          dirty,
          'b-t',
        );
      }
      const indexTop = binarySearchRemain<RealStyleType>(
        realStyle.top,
        marklineState.sortTop,
        'top',
        marklineConfig.indent,
      );
      if (indexTop) {
        marklineDisplay(
          realStyle,
          indexTop[0],
          lines,
          focus,
          indexTop[1],
          dirty,
          'top',
        );
      }
      const indexRight = binarySearchRemain<RealStyleType>(
        realStyle.right,
        marklineState.sortRight,
        'right',
        marklineConfig.indent,
      );
      if (indexRight) {
        marklineDisplay(
          realStyle,
          indexRight[0],
          lines,
          focus,
          indexRight[1],
          dirty,
          'right',
        );
      }
      const indexBottom = binarySearchRemain<RealStyleType>(
        realStyle.bottom,
        marklineState.sortBottom,
        'bottom',
        marklineConfig.indent,
      );
      if (indexBottom) {
        marklineDisplay(
          realStyle,
          indexBottom[0],
          lines,
          focus,
          indexBottom[1],
          dirty,
          'bottom',
        );
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const v = unfocus?.[i];
      const l = v?.left;
      const t = v?.top;
      const w = v?.width;
      const h = v?.height;
      if (
        typeof l === 'number' &&
        typeof t === 'number' &&
        typeof w === 'number' &&
        typeof h === 'number'
      ) {
        const ro = v.rotate.value;
        const rstyle = getComponentRotatedStyle(ro, w, h, l, t);
        if (!marklineState.cache) {
          marklineState.cache = {
            [v.id]: rstyle,
          };
        } else {
          marklineState.cache[v.id] = rstyle;
        }
        newMarklineDisplay(realStyle, rstyle, lines);
        // if (lines.x.length !== 0 || lines.y.length !== 0) {
        // 	break; 这里不能break要算完所有值
        // }
      }
    }
  }

  return lines;
}

export function MarklineX(props: any) {
  return (
    <div
      className="yh-markline"
      style={{
        borderTop: `1px solid red`,
        position: 'absolute',
        width: '100%',
        top: props.top,
        display: props.display,
        zIndex: 9999,
      }}
    ></div>
  );
}
export function MarklineY(props: any) {
  return (
    <div
      className="yh-markline"
      style={{
        borderLeft: `1px solid red`,
        position: 'absolute',
        height: '100%',
        left: props.left,
        display: props.display,
        zIndex: 9999,
      }}
    ></div>
  );
}

export function NormalMarkLineRender(props: {
  config: Record<string, any>;
  iframe: boolean;
}) {
  const lines = marklineCalRender(props.config);
  const render = useMemo(() => {
    return (
      <>
        {lines.x.map((v, i) => {
          return <MarklineX key={i} top={v}></MarklineX>;
        })}
        {lines.y.map((v, i) => {
          return <MarklineY key={i} left={v}></MarklineY>;
        })}
      </>
    );
  }, [lines]);
  return <>{render}</>;
}
