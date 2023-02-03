import { useWhyDidYouUpdate } from 'ahooks';
import react, { memo, useMemo } from 'react';
import { dynamic, request } from 'umi';
import useRequest from '_@ahooksjs_use-request@2.8.15@@ahooksjs/use-request';

const BuildDatasource = async (config) => {
  const { dataType, dataIndex: dataIndexJSON, requestUrl } = config;
  if (!dataType || !dataIndexJSON) {
    return config?.dataSource;
  }
  if (dataType === 'static') {
    return config?.dataSource;
  }
  const dataIndex = JSON.parse(dataIndexJSON);
  const reqUrl = dataType === 'api' ? requestUrl : dataIndex?.uri;
  const res = await request(reqUrl);

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
  console.log(res);
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
