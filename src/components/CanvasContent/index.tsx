import React from 'react';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import DragWrap from '../DragWrap';

// 画布主内容
export default function CanvasContent() {
  return <div>
    <AlignReferenceLine>
      <EditSideToolbar>
        <DragWrap>
          aaa
        </DragWrap>
      </EditSideToolbar>
    </AlignReferenceLine>
  </div>;
}
