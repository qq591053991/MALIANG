import { EditorContext } from '@/pages/Editor';
import { EyeFilled, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, message, Popover } from 'antd';
import React, { useContext } from 'react';
import styles from './index.less';

export default function TopBar() {
  const [state, dispatch] = useContext(EditorContext);

  function saveCanvas() {
    localStorage.setItem('configureData', JSON.stringify(state));
    message.success('保存成功');
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
            onClick={saveCanvas}
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
