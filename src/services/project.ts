import request from '@/utils/request';

export function getScreenList() {
  return request('/canvas');
}

// 获取大屏列表
export function getList() {
  return request({
    url: '/canvas/list',
  });
}

interface iData {
  configureName: string;
}
export function addScreen(data: iData) {
  return request({
    url: '/canvas',
    method: 'post',
    data,
  });
}

export function delScreen(id: string | number) {
  return request({
    url: `/canvas/${id}`,
    method: 'delete',
  });
}
