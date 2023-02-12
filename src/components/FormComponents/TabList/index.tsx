import { FormRender } from '@/core';
import { v4 as uuid } from 'uuid';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useDynamicList, useSet } from 'ahooks';
import { Collapse, message } from 'antd';

interface iTabList {
  key: string;
  name: string;
  value: any[];
  config: any[];
  initialValue: any;
  onChange: (value: any) => void;
}

const { Panel } = Collapse;

export default memo(function TabList(props: iTabList) {
  const {
    key,
    name,
    config,
    initialValue = {},
    value = [initialValue],
    onChange,
  } = props;
  const { list, getKey, getIndex, push, remove, replace } = useDynamicList(
    value,
  );
  const _values = useMemo(() => {
    return list?.map((item, index) => ({
      ...item,
      label: name + (index + 1),
      key: index,
      uuid: item?.uuid || getKey(index),
      formId: item?.formId || uuid(),
    }));
  }, [list]);
  const [curTab, setCurTab] = useState({ ..._values?.[0] });
  const getFormRenderProps = useMemo(() => {
    return {
      uid: curTab?.formId,
      config,
      defaultValue: list[getIndex(curTab?.uuid)],
      onSave: (values: Record<string, any>) => {
        replace(getIndex(curTab?.uuid), values);
      },
    };
  }, [curTab, list]);

  useEffect(() => {
    onChange(list);
  }, [list, list?.length]);

  useEffect(() => {
    if (list?.length <= 0) {
      return;
    }
    const nIndex = list?.length - 1;
    setCurTab({ ...list[nIndex], uuid: getKey(nIndex) });
  }, [list?.length]);

  const onRemove = useCallback(() => {
    // 只有一条不可删除
    if (list?.length === 1) {
      message.warning('不可删除，最少为一条！');
      return;
    }
    if (!curTab?.uuid && curTab?.uuid !== 0) {
      return;
    }
    remove(getIndex(curTab?.uuid));
  }, [curTab]);

  return (
    <div>
      <Collapse expandIconPosition="end">
        <Panel
          key={key}
          header={name}
          extra={
            <div className="icon-group">
              <CopyOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  push(curTab);
                }}
              />
              <PlusOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  push(initialValue);
                }}
              />
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              />
            </div>
          }
        >
          <ul className={styles.tabs}>
            {_values?.map((tab, index) => (
              <li
                className={`${styles['tab-item']} ${
                  curTab.uuid === tab?.uuid ? styles['active'] : ''
                }`}
                onClick={() => setCurTab({ ...tab })}
              >
                <span>{tab?.label}</span>
              </li>
            ))}
          </ul>
          <div className={styles.tabsContentWrap}>
            <div className={styles.tabsContent}>
              <FormRender {...getFormRenderProps} />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
