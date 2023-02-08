import React from 'react';
import { Button } from 'antd';
import * as DataVBorderBox from '@jiaminghi/data-view-react';

export default function BorderBox(props) {
  const { classType = 'BorderBox1' } = props;
  const DynamicBorderBox = DataVBorderBox[classType];
  return <DynamicBorderBox color={['rgba(116,147,177)']} />;
}
