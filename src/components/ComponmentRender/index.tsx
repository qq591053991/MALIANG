import react from 'react';
import { dynamic } from 'umi';

const BuildComponment = (type, config) => {
  return dynamic({
    loader: async () => {
      const {
        default: Componment,
      } = await require(`@/ComponmentSource/${type}`);
      return (props) => {
        console.log(config);
        return <Componment {...config}></Componment>;
      };
    },
    loading: () => <div>加载中....</div>,
  });
};

export default function ComponmentRender(props) {
  // return <DynamicComponment {...props} />
  const { type, config, category } = props;
  const DynamicComponment = BuildComponment(type, config);
  console.log(props);
  return (
    <>
      <DynamicComponment {...props} />
    </>
  );
}
