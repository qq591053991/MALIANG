import { defineConfig } from 'umi';
import routes from './config/router/routes';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  /**
   * @name 国际化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'zh-CN',
  },
  webpack5: {},
  // plugins: [
  //   new MonacoWebpackPlugin({
  //     languages: ['json']
  //   })
  // ]
  chainWebpack(config) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['yaml', 'json', 'javascript', 'typescript'],
      },
    ]);
  },
});
