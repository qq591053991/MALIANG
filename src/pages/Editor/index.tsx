import React, { useReducer, createContext } from 'react';
import LeftBar from '@/components/LeftBar';
import CanvasContent from '@/components/CanvasContent';
import RightBar from '@/components/RightBar';
import styles from './index.less';
import Draggable from 'react-draggable';

interface iEditorState {
  componmentList: any[];
  width: number;
  height: number;
}

export const EditorContext = createContext();

const defaultEditorState: iEditorState = {
  componmentList: [],
  width: 1920,
  height: 1080,
};

function reducer(state: iEditorState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'ADD_COMPONMENT':
      return {
        ...state,
        componmentList: state.componmentList.concat(
          action.payload.componmentConfig,
        ),
      };
    case 'SELECT_COMPONENT':
      return {
        ...state,
        activedComponentId: action.payload.componentId,
      };
    default:
      return state;
  }
}

export default function Editor() {
  const editorState = useReducer(reducer, defaultEditorState);
  return (
    <div className={styles.editor}>
      <EditorContext.Provider value={editorState}>
        <LeftBar></LeftBar>
        <CanvasContent></CanvasContent>
        <RightBar></RightBar>
      </EditorContext.Provider>
    </div>
  );
}
