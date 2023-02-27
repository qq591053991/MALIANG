import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.less';
import { EditorContext } from '@/pages/Editor';
import { FormRender } from '@/core';
import allShema from '@/ComponentSource/schema';
import { BaseFormConfig } from '@/ComponentSource/BaseConfig';
import { uuid } from '@/utils/tool';
import { useWhyDidYouUpdate } from 'ahooks';

function RightBar(props) {
  const [state, dispatch] = useContext(EditorContext);
  const { curComponentConfig, canvasConfig } = state;
  const [curTab, setCurTab] = useState({
    label: '配置',
    key: 'config',
    children: '配置',
  });

  const tabList = curComponentConfig
    ? [
      {
        label: '配置',
        key: 'config',
        children: '配置',
      },
      {
        label: '数据',
        key: 'data',
        children: '数据',
      },
      {
        label: '交互',
        key: 'event',
        children: '交互',
      },
    ]
    : [
      {
        label: '配置',
        key: 'config',
        children: '配置',
      },
    ];

  const canvasFormConfig = [
    {
      type: 'Number',
      name: '画布宽度',
      key: 'width',
    },
    {
      type: 'Number',
      name: '画布高度',
      key: 'height',
    },
    // {
    //   type: 'Text',
    //   name: '画布高度',
    //   key: '1'
    // },
    // {
    //   type: 'TextArea',
    //   name: '画布高度',
    //   key: '2'
    // },
    {
      type: 'Color',
      name: '画布背景',
      key: 'backgroundColor',
    },
    // {
    //   type: 'Select',
    //   name: '画布背景',
    //   key: 'Select',
    //   options: [
    //     {
    //       label: '测试选项1',
    //       value: 1
    //     },
    //     {
    //       label: '测试选项2',
    //       value: 2
    //     },
    //   ]
    // },
  ];

  const handleCanvasSave = useMemo(() => {
    return (data: any) => {
      dispatch({
        type: 'UPDATE_CANVAS',
        payload: { canvasConfig: data },
      });
    };
  }, [dispatch]);

  const handleComponentConfigSave = useMemo(() => {
    return (data: any) => {
      dispatch({
        type: 'UPDATE_COMPONENT_CONFIG',
        payload: { componentConfig: data },
      });
    };
  }, [dispatch]);

  const getFormConfig = function () {
    const {
      dataConfig,
      eventConfig,
      baseConfig
    } = allShema[curComponentConfig?.type]
    if (curTab.key === 'data') {
      return dataConfig;
    }
    if (curTab.key === 'event') {
      return eventConfig;
    }
    return baseConfig;
  };

  const getFormRenderProps = useMemo(() => {
    if (!curComponentConfig) {
      return {
        uid: 'canvas',
        config: canvasFormConfig,
        defaultValue: canvasConfig,
        onSave: handleCanvasSave,
      };
    }
    return {
      uid: curComponentConfig?.componentId,
      config: getFormConfig(),
      defaultValue: curComponentConfig.config,
      onSave: handleComponentConfigSave,
    };
  }, [curComponentConfig, curTab]);

  return (
    <div className={styles.rightBar}>
      <ul className={styles.tabs}>
        {tabList.map((category) => (
          <li
            className={`${styles['tab-item']} ${curTab.key === category.key ? styles['active'] : ''
              }`}
            onClick={() => setCurTab(category)}
          >
            <span>{category?.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.tabsContentWrap}>
        <div className={styles.tabsContent}>
          <FormRender {...getFormRenderProps} />
        </div>
      </div>
    </div>
  );
}

export default memo(RightBar);
