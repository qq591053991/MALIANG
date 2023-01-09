import { angleToRadian } from '@/utils';

export function cos(rotate: number) {
  return Math.abs(Math.cos(angleToRadian(rotate)));
}

export function sin(rotate: number) {
  return Math.abs(Math.sin(angleToRadian(rotate)));
}

export function getComponentRotatedStyle(
  rotate: number,
  width: number,
  height: number,
  left: number,
  top: number,
) {
  const style = {
    left,
    width,
    height,
    right: left + width,
    top,
    bottom: top + height,
  };
  if (rotate !== 0) {
    const newWidth = style.width * cos(rotate) + style.height * sin(rotate);
    const diffX = (style.width - newWidth) / 2; // 旋转后范围变小是正值，变大是负值
    style.left += diffX;
    style.right = style.left + newWidth;
    const newHeight = style.height * cos(rotate) + style.width * sin(rotate);
    const diffY = (newHeight - style.height) / 2; // 始终是正
    style.top -= diffY;
    style.bottom = style.top + newHeight;
    style.width = newWidth;
    style.height = newHeight;
  } else {
    style.bottom = style.top + style.height;
    style.right = style.left + style.width;
  }

  return style;
}
