import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求体有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  default: '系统未知错误，请反馈给管理员',
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: process.env.NODE_ENV === 'production' ? '/aisos' : '/aisos', // 路径前缀
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 6000,
});

/**
 * 请求拦截器
 */
request.interceptors.request.use((url, options) => {
  const headers = options?.headers || {};
  const prefix = options?.prefix || '';
  return {
    url: options?.url ? prefix + options?.url : url,
    options: {
      headers,
      ...options,
    },
  };
});

/**
 * 响应拦截器
 */
request.interceptors.response.use(async (res: any) => {
  const result = (await res?.json()) || {};
  const { code, msg } = result;
  // 未设置状态码则默认成功状态
  // 获取错误信息
  const message = codeMessage[code] || codeMessage['default'];
  if (code && code === 401) {
    const key = `loginTip`;
    notification.open({
      message: '系统提示',
      description: '登录状态已过期，您可以继续留在该页面，或者重新登录',
      key,
    });
    return Promise.reject(msg);
  }
  else if (code && code !== 200) {
    notification.error({
      message: msg,
    });
    return Promise.reject(msg);
  } else {
    return result;
  }
});

export default (...args: any[]) => {
  if (typeof args[0] === 'string') {
    return request(args[0], args[1]);
  } else {
    return request(args[0]?.url, args[0]);
  }
};
