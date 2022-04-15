import React from 'react';
import LeftBar from '@/components/LeftBar';
import CanvasContent from '@/components/CanvasContent';
import RightBar from '@/components/RightBar';
import styles from './index.less';

export default function Editor() {
  return (
    <div className={styles.editor}>
      <LeftBar></LeftBar>
      <CanvasContent></CanvasContent>
      <RightBar></RightBar>
    </div>
  );
}
