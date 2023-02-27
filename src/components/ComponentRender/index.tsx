import { useWhyDidYouUpdate } from 'ahooks';
import react, { memo, useContext, useMemo } from 'react';
import { dynamic, request } from 'umi';
import { useRequest } from 'ahooks';
import { MappingList } from '../FormComponents/DataMapping';
import { EventCenter } from '@/ComponentSource/EventConfig';
import { EditorContext } from '@/pages/Editor';
import ComponentLoading from '../ComponentLoading';

const BuildMappingData = ({ config = {}, data = [] }) => {
  try {
    const { dataMapping }: { dataMapping?: MappingList } = config;
    if (!dataMapping) return data;
    return data?.map((item: any) => {
      const r = item;
      dataMapping?.forEach(({ key, mapping }) => {
        if (mapping) {
          r[key] = r[mapping];
        }
      });
      return r;
    });
  } catch (error) {
    return [];
  }
};

const BuildDatasource = async (config) => {
  const { dataType, dataQuota: dataQuotaJSON, requestUrl } = config;
  let reqUrl = '';
  if (dataType === 'dataQuota') {
    if (!dataQuotaJSON) {
      return config?.dataSource;
    }
    const dataQuota = JSON.parse(dataQuotaJSON);
    reqUrl = dataQuota?.uri || '';
  }

  if (dataType === 'static') {
    return BuildMappingData({ config, data: config?.dataSource });
  }
  if (dataType === 'api') {
    reqUrl = requestUrl;
  }

  if (!reqUrl) {
    return null;
  }
  const reqRes = await request(reqUrl);
  if (!reqRes) {
    return null;
  }
  const result = BuildMappingData({ config, data: reqRes });
  return result;
};

const useEventCallback = ({ config }) => {
  const [{ componentList }, dispatch] = useContext(EditorContext);
  const result = {};
  config?.eventConfig?.map((item) => {
    result[item?.eventCallbackKey] = function () {
      const eConfig = config?.config[item?.key];
      switch (eConfig?.cmpAction) {
        case 'filter':
          break;
        case 'refresh':
          // componentList?.forEach((cItem) => {
          //   if (cItem?.componentId === config?.componentId) {
          //     cItem?.config?.run?.();
          //     console.log(cItem?.config?.run);
          //   }
          // });
          break;

        default:
          break;
      }
    };
  });

  return result;
};

const PollingWrapComponent = (props) => {
  const { Component, config } = props;
  const { isPolling, pollingInterval = 0 } = config?.config;
  const { data: res, run } = useRequest(
    async () => await BuildDatasource(config?.config),
    {
      pollingInterval:
        isPolling && config?.config?.dataType !== 'static'
          ? pollingInterval
          : 0,
    },
  );
  // config.config.run = run;
  // const eventCallback = useEventCallback({ config });
  const _config = { ...config?.config, dataSource: res };
  return (
    <Component
      {..._config}
    // {...eventCallback}
    />
  );
};

const BuildComponent = (type, config) => {
  return dynamic({
    loader: async () => {
      const { default: Component } = await require(`@/ComponentSource/${type}`);
      // await new Promise((resolve, reject) => {
      //   setTimeout(async () => {
      //     resolve('')
      //   }, 3000)
      // })
      return (props) => {
        return <PollingWrapComponent Component={Component} config={config} />;
      };
    },
    loading: () => <ComponentLoading />,
  });
};

export default memo(function ComponentRender(props) {
  const { type, config } = props;
  const DynamicComponent = useMemo(() => {
    return BuildComponent(type, props);
  }, [config]);
  return (
    <>
      <DynamicComponent {...props} />
    </>
  );
});
