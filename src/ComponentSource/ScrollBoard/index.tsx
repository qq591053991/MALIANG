import React, { useMemo } from 'react';
import { ScrollBoard as DatavScrollBoard } from '@jiaminghi/data-view-react';

export default function ScrollBoard(props) {
  const {
    dataSource = {},
    headerConfig = {},
    lineConfig = {},
    globalConfig = {},
    columns,
  } = props;
  const { headerBGC, headerHeight, headerVisible } = headerConfig;
  const { oddRowBGC, evenRowBGC } = lineConfig;
  // const { waitTime, rowNum, index, } = headerConfig

  const data = useMemo(() => {
    return dataSource?.data?.map((item: any[]) => {
      if (Array.isArray(item)) {
        return item.map((str, colIndex) => {
          return `<span 
                style="
                  color:${columns?.[colIndex]?.textStyle?.color || '#fff'};
                  font-size:${
                    columns?.[colIndex]?.textStyle?.fontSize + 'px' || '14px'
                  }
                "
               >
                ${str}
               <span/>
        `;
        });
      }
      return item;
    });
  }, [dataSource?.data]);
  const config = useMemo(
    () => ({
      columnWidth: columns?.map((item) => item?.columnWidth || 180),
      header: headerVisible ? dataSource?.header : null,
      data,
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
  return <DatavScrollBoard config={config} />;
}
