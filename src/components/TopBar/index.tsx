import { EditorContext } from '@/pages/Editor';
import { saveCanvas } from '@/services/editor';
import { EyeFilled, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, message, Popover } from 'antd';
import React, { useContext } from 'react';
import { history } from 'umi';
import styles from './index.less';

export default function TopBar() {
  const [{ mode, ...state }, dispatch] = useContext(EditorContext);
  async function toSaveCanvas() {
    const configureStr = JSON.stringify(state);
    localStorage.setItem('configureData', configureStr);
    const id = new URLSearchParams(history.location.search).get('id');
    if (id) {
      saveCanvas({
        id,
        configureData: configureStr,
      });
      message.success('保存成功');
    }
  }

  function toPreview() {
    window.open('/preview');
  }

  return (
    <div className={styles['header']}>
      <div className={styles['global-action']}>
        <Popover content="保存">
          <Button
            className={styles['header-button']}
            size="middle"
            icon={<SaveOutlined className={styles['header-button-icon']} />}
            type="text"
            onClick={toSaveCanvas}
            ghost
          />
        </Popover>
        <Popover content="预览">
          <Button
            className={styles['header-button']}
            size="middle"
            icon={<EyeOutlined className={styles['header-button-icon']} />}
            type="text"
            onClick={toPreview}
            ghost
          />
        </Popover>
      </div>
    </div>
  );
}
