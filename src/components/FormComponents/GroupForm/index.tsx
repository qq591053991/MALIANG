import { FormRender } from '@/core';
import { Collapse } from 'antd';
import React from 'react';
import styles from './index.less';

export default function GroupForm(props) {
  const { key, name, config, value, onChange } = props;
  const { Panel } = Collapse;
  return (
    <Collapse expandIconPosition="end">
      <Panel key={key} header={name}>
        <FormRender
          uid={key}
          config={config}
          onSave={onChange}
          defaultValue={value}
        />
      </Panel>
    </Collapse>
  );
}
