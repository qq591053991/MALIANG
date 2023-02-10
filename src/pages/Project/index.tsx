import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

export default function Project() {
  const [projectList, setProject] = useState([{}]);
  return (
    <div>
      <div className={styles['marin-screen']}>
        <div className="project-list">
          {projectList?.map((item, index) => (
            <div className={`screen`} key={index}>
              <div className="screen-info">
                <div
                  className="screen-img"
                  style={{
                    backgroundImage: `url(//datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/965251_0b867e53c1d233ce9fe49d54549a2323.png?date=1675935094426&quot;)`,
                  }}
                />
                <div className="screen-edit">
                  <div className="screen-button">
                    <div className="edit-btn">
                      <Button
                        type="primary"
                        style={{
                          borderRadius: 0,
                        }}
                      >
                        编辑
                      </Button>
                    </div>
                    <div className="main-button">
                      <div className="button-span">
                        <EyeOutlined />
                      </div>
                      <div className="button-span">
                        <DeleteOutlined />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screen-main">
                <div className="main-name" title={'数据大屏'}>
                  数据大屏
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
