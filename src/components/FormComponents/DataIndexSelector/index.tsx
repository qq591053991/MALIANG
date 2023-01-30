import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { useRequest } from 'ahooks';
import { getApiList } from '@/services/editor';

function DataIndexSelector(props) {
  const { value, onChange } = props;
  const {
    data: res,
    loading,
    run,
  } = useRequest(getApiList, {
    manual: true,
  });
  useEffect(() => {
    run();
  }, []);

  const sId = JSON.parse(value || '{}')?.id;

  return (
    <Select
      placeholder="请选择"
      popupClassName="dark-select-dropdown"
      loading={loading}
      value={sId}
      onChange={(value) =>
        onChange(
          JSON.stringify(res?.data?.find((item: any) => item.id === value)),
        )
      }
    >
      {res?.data?.map((v: any) => {
        return (
          <Select.Option value={v.id} key={v.id}>
            {v.name}
          </Select.Option>
        );
      })}
    </Select>
  );
}
export default memo(DataIndexSelector, function (prevProps, nextProps) {
  return true;
});
