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

export default function DataMapping(props) {
  const {
    name,
    label,
    value = [{ key: 'xAxis', mapping: 0 }],
    onChange,
  } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    value.map((item) => item.key),
  );
  console.log('datamapping');
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
