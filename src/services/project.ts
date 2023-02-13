import request from '@/utils/request';

export function getScreenList() {
  return request('/canvas');
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
