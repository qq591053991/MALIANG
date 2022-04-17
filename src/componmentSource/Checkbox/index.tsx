import React from 'react';
import { Checkbox } from 'antd';

export default function Text(props) {
  const { options = [{ label: 'aaa', value: '1' }] } = props;
  return <Checkbox.Group options={options} />;
}
