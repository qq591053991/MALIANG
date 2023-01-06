import React, { useState } from 'react';
import schema from '@/ComponentSource/schema';
import styles from './index.less';
import { v4 as uuid } from 'uuid';
import { iComponentCategory } from '@/typings/SchemaCommon';

const componmentList = Object.values(schema);
const tabList = [...new Set(componmentList.map((item) => item.category))];

const cateInfoSet = {
  [iComponentCategory.INOFRMATION]: {
    title: '信息',
    iconClass: 'icon-a-daohang-xinxi',
  },
  [iComponentCategory.CONTORL]: {
    title: '控件',
    iconClass: 'icon-a-daohang-kongjian',
  },
};

export default function LeftBar() {
  const [curTab, setCurTab] = useState(iComponentCategory.INOFRMATION);

  function dragStart(event: React.DragEvent, componmentConfig) {
    event.dataTransfer.setData(
      'componmentConfig',
      JSON.stringify(componmentConfig),
    );
    event.dataTransfer.setData('componentId', uuid());
  }

  return (
    <div className={styles.sideBar}>
      <ul className={styles.tabs}>
        {tabList.map((category: iComponentCategory) => (
          <li
            className={`${styles.tabItem} ${
              curTab === category ? styles.active : ''
            }`}
            onClick={() => setCurTab(category)}
          >
            <i
              className={`iconfont ${styles.iconfont} ${cateInfoSet[category]?.iconClass}`}
            />
            <span>{cateInfoSet[category]?.title}</span>
          </li>
        ))}
      </ul>
      <div className={styles.tabsContentWrap}>
        <div className={styles.tabsContent}>
          <div className={styles.componmentList}>
            {componmentList
              .filter((item) => item?.category === curTab)
              .map((item) => (
                <div
                  className={styles.componmentItem}
                  onDragStart={(e) => dragStart(e, item)}
                  draggable
                >
                  <i className={`iconfont ${item.icon} ${styles.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
