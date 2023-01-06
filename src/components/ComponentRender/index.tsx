import react, { memo } from 'react';
import { dynamic } from 'umi';

const BuildComponent = (type, config) => {
  return dynamic({
    loader: async () => {
      const { default: Component } = await require(`@/ComponentSource/${type}`);
      return (props) => {
        return <Component {...config}></Component>;
      };
    },
    loading: () => <div>加载中....</div>,
  });
};

export default memo(function ComponentRender(props) {
  // return <DynamicComponent {...props} />
  const { type, config } = props;
  const DynamicComponent = BuildComponent(type, config);
  console.log(props);
  return (
    <>
      <DynamicComponent {...props} />
    </>
  );
});
