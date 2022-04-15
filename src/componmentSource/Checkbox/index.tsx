import React from 'react';
import { Checkbox } from 'antd';

export default function Text(props) {
  const { options = [] } = props;
  return <Checkbox.Group options={options} />;
}
