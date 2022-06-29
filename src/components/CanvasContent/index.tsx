import React, { useContext } from 'react';
import { EditorContext } from '@/pages/Editor';
import EditSideToolbar from '@/components/EditSideToolbar';
import AlignReferenceLine from '@/components/AlignReferenceLine';
import DragWrap from '../DragWrap';
import styles from './index.less';
import ComponmentRender from '../ComponmentRender';

// 画布主内容
export default function CanvasContent(props) {
  const [state, dispatch] = useContext(EditorContext);
  function onDrop(event: React.DragEvent) {
    const componmentConfig = JSON.parse(
      event.dataTransfer.getData('componmentConfig'),
    );
    componmentConfig.componentId = event.dataTransfer.getData('componentId');
    dispatch({
      type: 'ADD_COMPONMENT',
      payload: {
        componmentConfig,
      },
    });
  }
  const { componmentList = [], activedComponentId = '' } = state;

  const selectComponent = (curComponentConfig) => {
    const { componentId } = curComponentConfig;
    dispatch({
      type: 'SELECT_COMPONENT',
      payload: {
        componentId,
      },
    });
  };

  return (
    <div
      className={styles.main}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      {componmentList.map((componmentConfig) => {
        return (
          <AlignReferenceLine
            onClick={() => selectComponent(componmentConfig)}
            actived={activedComponentId === componmentConfig?.componentId}
            {...componmentConfig}
          >
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
