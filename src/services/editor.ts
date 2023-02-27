import request from '@/utils/request';

export function getApiList() {
  return request('/api/info/list');
}

export function getCanvasInfo(id: string | number) {
  return request({
    url: '/canvas',
    params: { id }
  });
}

interface iCanvasData {
  configureData: string;
  id: string;
}

export function saveCanvas(data: iCanvasData) {
  return request({
    url: '/canvas',
    method: 'put',
    data,
  });
}
