import React, { useContext } from 'react';
import { EditorContext } from '@/pages/Editor';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import DragWrap from '../DragWrap';
import styles from './index.less';
import ComponmentRender from '../ComponmentRender';

// 画布主内容
export default function CanvasContent(props) {
  const { dispatch, state } = useContext(EditorContext);
  console.log(state);
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
  return (
    <div
      className={styles.main}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      {componmentList.map((componmentConfig) => {
        return (
          <AlignReferenceLine>
            <EditSideToolbar>
              <DragWrap>
                <ComponmentRender {...componmentConfig} />
              </DragWrap>
            </EditSideToolbar>
          </AlignReferenceLine>
        );
      })}
    </div>
  );
}
