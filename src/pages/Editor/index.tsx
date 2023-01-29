import React, { useReducer, createContext } from 'react';
import LeftBar from '@/components/LeftBar';
import CanvasContent from '@/components/CanvasContent';
import RightBar from '@/components/RightBar';
import styles from './index.less';
import Draggable from 'react-draggable';

interface iEditorState {
  componentList: any[];
  width: number;
  height: number;
  curComponentConfig?: Record<string, any> | null;
  canvasConfig?: {
    width: number;
    height: number;
    backgroundColor: string;
  };
}

export const EditorContext = createContext();

const defaultEditorState: iEditorState = {
  componentList: [],
  width: 1920,
  height: 1080,
  curComponentConfig: null,
  canvasConfig: {
    width: 1920,
    height: 1080,
    backgroundColor: 'rgba(7,11,23,1)',
  },
};

function reducer(state: iEditorState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'ADD_COMPONMENT':
      return {
        ...state,
        componentList: state.componentList.concat(
          action.payload.componentConfig,
        ),
      };
    case 'SELECT_COMPONENT':
      return {
        ...state,
        curComponentConfig: action.payload.componentConfig,
      };
    case 'SELECT_CANVAS':
      return {
        ...state,
        curComponentConfig: null,
      };
    case 'UPDATE_CANVAS':
      return {
        ...state,
        canvasConfig: {
          ...state.canvasConfig,
          ...action.payload.canvasConfig,
        },
      };
    case 'UPDATE_COMPONENT_LAYOUT':
      return {
        ...state,
        componentList: updateLayoutById(
          state.componentList,
          action.payload.componentId,
          action.payload.layoutConfig,
        ),
        curComponentConfig: {
          ...state?.curComponentConfig,
          config: {
            ...state?.curComponentConfig?.config,
            ...action.payload.layoutConfig,
          },
        },
      };
    case 'UPDATE_COMPONENT_CONFIG':
      return {
        ...state,
        componentList: updateConfigById(
          state.componentList,
          state?.curComponentConfig?.componentId,
          action.payload.componentConfig,
        ),
        curComponentConfig: {
          ...state?.curComponentConfig,
          config: action.payload.componentConfig,
        },
      };
    default:
      return state;
  }
}

function updateConfigById(componentList, componentId, config) {
  return componentList.map((item) => {
    if (item.componentId === componentId) {
      item = {
        ...item,
        config: {
          ...item?.config,
          ...config,
        },
      };
    }
    return item;
  });
}

function updateLayoutById(componentList, componentId, layoutConfig) {
  return componentList.map((item) => {
    if (item.componentId === componentId) {
      item = {
        ...item,
        config: {
          ...item?.config,
          ...layoutConfig,
        },
      };
    }
    return item;
  });
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
