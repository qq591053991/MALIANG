import { FormRender } from '@/core';
import { v4 as uuid } from 'uuid';
import React, { memo, useMemo, useState } from 'react';
import styles from './index.less';
import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useDynamicList, useSet } from 'ahooks';

const defaultTabs = [
  {
    label: '系列',
    key: 'series',
  },
];

export default memo(function Series(props) {
  const { value = defaultTabs, onChange } = props;
  const { list: _values, add, remove, reset } = useDynamicList(value);
  const tabs = _values?.map((item, index) => ({
    ...item,
    label: '系列' + (index + 1),
    key: index,
  }));
  const [curTab, setCurTab] = useState(value?.[0]);
  const getFormRenderProps = useMemo(() => {
    return {
      uid: curTab,
      config: [
        {
          key: 'areaColor',
          name: '区域颜色',
          type: 'Color',
        },
        {
          key: 'lineColor',
          name: '线条颜色',
          type: 'Color',
        },
        {
          key: 'lineWidth',
          name: '线条宽度',
          type: 'Number',
        },
        {
          key: 'lineType',
          name: '线条类型',
          type: 'Select',
          options: [
            {
              label: '实线',
              value: 'solid',
            },
            {
              label: '虚线',
              value: 'dashed',
            },
          ],
        },
      ],
      defaultValue: value,
      onSave: (values) => {},
    };
  }, [value, curTab]);

  return (
    <div>
      <div className={`ant-form-item`}>
        <div
          className={`ant-col ant-form-item-label ${styles['series-title']}`}
        >
          <label className="ant-form-item-no-colon">系列</label>
          <div>
            <CopyOutlined />
            <PlusOutlined />
            <DeleteOutlined />
          </div>
        </div>
      </div>
      <ul className={styles.tabs}>
        {tabs?.map((tab, index) => (
          <li
            className={`${styles['tab-item']} ${
              curTab.key === tab.key ? styles['active'] : ''
            }`}
            onClick={() => setCurTab(tab)}
          >
            <span>{'系列' + (index + 1)}</span>
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
});
