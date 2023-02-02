import { useWhyDidYouUpdate } from 'ahooks';
import react, { memo, useMemo } from 'react';
import { dynamic, request } from 'umi';
import useRequest from '_@ahooksjs_use-request@2.8.15@@ahooksjs/use-request';

const BuildDatasource = async (config) => {
  const { dataType, dataIndex: dataIndexJSON } = config;
  if (!dataType || !dataIndexJSON) {
    return;
  }
  if (dataType === 'static') {
    return config?.dataSource;
  }
  const dataIndex = JSON.parse(dataIndexJSON);
  const res = await request(
    'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
  );

  return res;
};

const PollingWrapComponent = (props) => {
  const { Component, config } = props;
  const { isPolling, pollingInterval = 0 } = config;
  const { data: res, run } = useRequest(
    async () => await BuildDatasource(config),
    {
      pollingInterval: isPolling ? pollingInterval : 0,
    },
  );
  const _config = { ...config, dataSource: res };
  return <Component {..._config} />;
};

const BuildComponent = (type, config) => {
  return dynamic({
    loader: async () => {
      const { default: Component } = await require(`@/ComponentSource/${type}`);

      return (props) => {
        return <PollingWrapComponent Component={Component} config={config} />;
      };
    },
    loading: () => <div>加载中....</div>,
  });
};

export default memo(function ComponentRender(props) {
  // return <DynamicComponent {...props} />
  const { type, config } = props;
  const DynamicComponent = useMemo(() => {
    return BuildComponent(type, config);
  }, [config]);
  return (
    <>
      <DynamicComponent {...props} />
    </>
  );
});
