import React, { memo, useMemo } from 'react';
import { ScrollBoard as DatavScrollBoard } from '@jiaminghi/data-view-react';

export default memo(function ScrollBoard(props) {
  const {
    dataSource = {},
    headerConfig = {},
    lineConfig = {},
    globalConfig = {},
    columns,
  } = props;
  const { headerBGC, headerHeight, headerVisible } = headerConfig;
  const { oddRowBGC, evenRowBGC } = lineConfig;
  const config = useMemo(
    () => ({
      columnWidth: columns?.map((item) => item?.columnWidth || 180),
      align: columns?.map((item) => item?.align || 'left'),
      header: headerVisible ? dataSource?.header : null,
      data: dataSource?.data,
      headerHeight,
      headerBGC,
      oddRowBGC,
      evenRowBGC,
      ...globalConfig,
    }),
    [
      props?.dataSource,
      props?.headerConfig,
      props?.lineConfig,
      props?.columns,
      props?.globalConfig,
    ],
  );
  return <DatavScrollBoard
    config={config}
  />;
})
