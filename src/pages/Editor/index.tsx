import React, { useContext, Provider, useReducer, createContext } from 'react';
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

export const EditorContext = createContext({
  state: {},
  dispatch: () => {},
});

const defaultEditorState: iEditorState = {
  componmentList: [],
  width: 1920,
  height: 1080,
};

const reducer = (
  state: iEditorState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case 'ADD_COMPONMENT':
      const newState = {
        ...state,
        componmentList: state.componmentList.concat(
          action.payload.componmentConfig,
        ),
      };
      return newState;
  }
};

export default function Editor() {
  const [editorState, dispatch] = useReducer(reducer, defaultEditorState);
  return (
    <div className={styles.editor}>
      <EditorContext.Provider
        value={{
          state: editorState,
          dispatch,
        }}
      >
        <LeftBar></LeftBar>
        <CanvasContent></CanvasContent>
        <RightBar></RightBar>
      </EditorContext.Provider>
    </div>
  );
}
