import React, { memo, useContext, useMemo, useState } from 'react';
import styles from './index.less';
import { EditorContext } from '@/pages/Editor';
import { FormRender } from '@/core';
import { BaseFormConfig } from '@/ComponentSource/BaseConfig';
import { uuid } from '@/utils/tool';

export default function RightBar(props) {
  const [state, dispatch] = useContext(EditorContext);
  const { curComponentConfig, canvasConfig } = state;
  const [curTab, setCurTab] = useState({
    label: '配置',
    key: 'config',
    children: '配置',
  });

  const tabList = [
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

  const handleComponentConfigSave = (data: any) => {
    dispatch({
      type: 'UPDATE_COMPONENT_CONFIG',
      payload: { componentConfig: data },
    });
  };

  const getFormConfig = function () {
    if (curTab.key === 'data') {
      return curComponentConfig?.dataConfig;
    }
    if (curTab.key === 'event') {
      return curComponentConfig?.eventConfig;
    }
    return curComponentConfig?.baseConfig;
  };

  console.log(curComponentConfig?.config);
  return (
    <div className={styles.rightBar}>
      <ul className={styles.tabs}>
        {tabList.map((category) => (
          <li
            className={`${styles['tab-item']} ${
              curTab.key === category.key ? styles['active'] : ''
            }`}
            onClick={() => setCurTab(category)}
          >
            <span>{category?.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.tabsContentWrap}>
        <div className={styles.tabsContent}>
          {!curComponentConfig && (
            <FormRender
              uid={'canvas'}
              config={canvasFormConfig}
              defaultValue={canvasConfig}
              onSave={handleCanvasSave}
            />
          )}
          {curComponentConfig && (
            <FormRender
              uid={curComponentConfig.componentId}
              config={getFormConfig()}
              defaultValue={curComponentConfig.config}
              onSave={handleComponentConfigSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
