import { defineConfig } from 'umi';
import routes from './config/router/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
});
