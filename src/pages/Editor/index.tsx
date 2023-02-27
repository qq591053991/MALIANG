import React, { useReducer, createContext, useState, useEffect } from 'react';
import echarts, { registerTheme } from 'echarts';
import { default_theme } from '@/theme/echart-theme';
import LeftBar from '@/components/LeftBar';
import CanvasContent from '@/components/CanvasContent';
import RightBar from '@/components/RightBar';
import styles from './index.less';
import { v4 as uuid } from 'uuid';
import TopBar from '@/components/TopBar';
import { history, useLocation } from 'umi';
import mockCanvasConfigure from './中国工商银行.js';
import { getCanvasInfo } from '@/services/editor';

registerTheme('default_theme', default_theme);

interface iEditorState {
  mode: 'preview' | 'edit';
  componentList: any[];
  curComponentConfig?: Record<string, any> | null;
  canvasConfig?: {
    width: number;
    height: number;
    backgroundColor: string;
  };
}

export const EditorContext = createContext();

async function getCanvasConfigure() {
  const id = new URLSearchParams(history?.location?.search).get('id');
  try {
    const res = await getCanvasInfo(id);
    return JSON.parse(res?.data?.configureData)
    // return mockCanvasConfigure
    // return (
    //   JSON.parse(localStorage.getItem('configureData')) || mockCanvasConfigure
    // );
  } catch (error) {
    return {};
  }
}
const defaultEditorState: iEditorState =
  history.location.pathname.includes('/preview')
    ? {
    }
    : {
      componentList: [],
      curComponentConfig: null,
      canvasConfig: {
        width: 1920,
        height: 1080,
        backgroundColor: 'rgba(28,34,42,1)',
      },
    };

function reducer(state: iEditorState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'INITIALIZATION':
      return {
        ...state,
        ...action.payload.initialConfig,
      };
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
  const [editorContextState, dispatch] = useReducer(reducer, {
    ...defaultEditorState,
  });
  useEffect(() => {
    getCanvasConfigure().then((res) => {
      dispatch({
        type: 'INITIALIZATION',
        payload: {
          initialConfig: res,
        },
      });
    });
  }, []);
  if (mode === 'preview') {
    return (
      <div className={styles.editorWrap}>
        <EditorContext.Provider value={[{ mode, ...editorContextState }, dispatch]}>
          <div className={styles.editor}>
            <CanvasContent></CanvasContent>
          </div>
        </EditorContext.Provider>
      </div>
    );
  }

  return (
    <div className={styles.editorWrap}>
      <EditorContext.Provider value={[{ mode, ...editorContextState }, dispatch]}>
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
