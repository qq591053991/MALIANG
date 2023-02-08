import React from 'react';
import { ScrollBoard as DatavScrollBoard } from '@jiaminghi/data-view-react';

export default function ScrollBoard(props) {
  const { dataSource = {} } = props;
  const config = {
    columnWidth: [180, 180, 180],
    data: dataSource?.data,
  };
  return <DatavScrollBoard config={config} />;
}
