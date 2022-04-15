import React from 'react';
import schema from '@/componmentSource/schema';
import styles from './index.less';
import { iComponentCategory } from '@/typings/SchemaCommon';
import { Col, Row } from 'antd';

const componmentList = Object.values(schema);
const tabList = [...new Set(componmentList.map((item) => item.category))];
const categoryName = {
  [iComponentCategory.INOFRMATION]: '信息',
  [iComponentCategory.CONTORL]: '控件',
};
const cateInfoSet = {
  [iComponentCategory.INOFRMATION]: {
    title: '信息',
    iconCode: '111',
  },
  [iComponentCategory.CONTORL]: {
    title: '控件',
    iconCode: '111',
  },
};

export default function LeftBar() {
  return (
    <div className={styles.sideBar}>
      <ul className={styles.tabs}>
        {tabList.map((category: iComponentCategory) => (
          <li className={styles.tabItem}>
            <i>{cateInfoSet[category]?.iconCode}</i>
            <span>{cateInfoSet[category]?.title}</span>
          </li>
        ))}
      </ul>
      <div className={styles.tabsContentWrap}>
        <div className={styles.tabsContent}>
          <div className={styles.componmentList}>
            {componmentList.map((item) => (
              <div className={styles.componmentItem}>
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
