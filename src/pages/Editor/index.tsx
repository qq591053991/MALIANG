import React, { useReducer, createContext } from 'react';
import echarts, { registerTheme } from 'echarts';
import { default_theme } from '@/theme/echart-theme';
import LeftBar from '@/components/LeftBar';
import CanvasContent from '@/components/CanvasContent';
import RightBar from '@/components/RightBar';
import styles from './index.less';
import { v4 as uuid } from 'uuid';
import TopBar from '@/components/TopBar';
import { useLocation } from 'umi';
import { mockCanvasConfigure } from './mock.js';

registerTheme('default_theme', default_theme);

interface iEditorState {
  mode: 'preview' | 'edit';
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

const mockCanvasConfigureData = mockCanvasConfigure;

function getCanvasConfigure() {
  try {
    return (
      JSON.parse(localStorage.getItem('configureData')) ||
      mockCanvasConfigureData
    );
  } catch (error) {
    return mockCanvasConfigureData;
  }
}

const defaultEditorState: iEditorState =
  location.pathname === '/preview'
    ? {
        ...getCanvasConfigure(),
        mode: 'preview',
      }
    : {
        mode: 'edit',
        componentList: [],
        width: 1920,
        height: 1080,
        curComponentConfig: null,
        canvasConfig: {
          width: 1920,
          height: 1080,
          backgroundColor: 'rgba(7,11,23,1)',
        },
        ...getCanvasConfigure(),
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
    case 'COPY_COMPONENT':
      console.log(action.payload?.componentConfig);
      return {
        ...state,
        componentList: [
          ...state.componentList,
          {
            ...action.payload?.componentConfig,
            componentId: uuid(),
          },
        ],
      };
    case 'DELETE_COMPONENT':
      return {
        ...state,
        componentList: state.componentList?.filter(
          (item) =>
            item?.componentId !== action.payload?.componentConfig?.componentId,
        ),
        curComponentConfig: null,
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
  const location = useLocation();
  const mode = location?.pathname === '/preview' ? 'preview' : 'edit';
  const editorState = useReducer(reducer, { ...defaultEditorState });
  if (mode === 'preview') {
    return (
      <div className={styles.editorWrap}>
        <EditorContext.Provider value={editorState}>
          <div className={styles.editor}>
            <CanvasContent></CanvasContent>
          </div>
        </EditorContext.Provider>
      </div>
    );
  }

  return (
    <div className={styles.editorWrap}>
      <EditorContext.Provider value={editorState}>
        <TopBar />
        <div className={styles.editor}>
          <LeftBar></LeftBar>
          <CanvasContent></CanvasContent>
          <RightBar></RightBar>
        </div>
      </EditorContext.Provider>
    </div>
  );
}
