import { request } from 'umi';
export function getApiList() {
  return request('/aisos/api/info/list');
}
