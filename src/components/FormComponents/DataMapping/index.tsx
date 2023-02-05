import {
  EditableProTable,
  ProColumns,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './index.less';

export interface MappingItem {
  key: string;
  mapping: string;
}
export type MappingList = MappingItem[];

export default function DataMapping(props) {
  const { value = [{ key: 'xAxis', mapping: '' }], onChange } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    value.map((item) => item.key),
  );
  const columns: ProColumns[] = [
    {
      title: '字段',
      dataIndex: 'key',
      editable: false,
      width: 28,
    },
    {
      title: '映射',
      dataIndex: 'mapping',
      width: 60,
      fieldProps: {
        placeholder: '',
      },
    },
  ];
  return (
    <EditableProTable
      className={styles['mapping-table']}
      headerTitle={null}
      columns={columns}
      rowKey="key"
      value={value}
      onChange={onChange}
      toolBarRender={false}
      recordCreatorProps={false}
      editable={{
        type: 'multiple',
        editableKeys,
        onValuesChange: (record, recordList) => {
          onChange(recordList);
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
}
