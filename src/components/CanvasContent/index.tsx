import React from 'react';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import DragWrap from '../DragWrap';
import styles from './index.less';

// 画布主内容
export default function CanvasContent() {
  return (
    <div className={styles.main}>
      <AlignReferenceLine>
        <EditSideToolbar>
          <DragWrap>aaa</DragWrap>
        </EditSideToolbar>
      </AlignReferenceLine>
    </div>
  );
}
