import { FileImageOutlined, LinkOutlined } from '@ant-design/icons';
import { Input, Modal, Radio } from 'antd';
import { Model } from 'echarts';
import React, { useEffect, useState } from 'react';
import { flatArr, imgList, localImgs } from './mock';
import styles from './index.less';

enum iImageType {
  SYSTEM = 'system',
  CUSTOM = 'custom',
}

export default function ImageForm(props) {
  const { value = '', onChange } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  function onCancel() {
    setSelectedItem(null);
    setVisible(false);
  }

  function onOk() {
    onChange(selectedItem?.url);
    setSelectedItem(null);
    setVisible(false);
  }

  const _imgList = [...localImgs, ...flatArr(imgList)];

  return (
    <>
      <Input
        prefix={<LinkOutlined className="ml-gui-icon" />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="ml-gui-image-content">
        {value ? (
          <>
            <img className="design-pro-image" src={'https://blog.eirds.cn/image.php?url=' + value} />
            <div className="ml-gui-image-cover ml-gui-image-ud">
              <span onClick={() => setVisible(true)}>更改</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span onClick={() => setPreviewVisible(true)}>预览</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span>删除</span>
            </div>
          </>
        ) : (
          <div
            className="ml-gui-image-inner-content"
            onClick={() => {
              setVisible(true);
            }}
          >
            <FileImageOutlined
              className={`${styles['img-icon']} ml-gui-icon`}
            />
            点击更改图片
          </div>
        )}
      </div>
      <Modal
        className="dark-modal design-img-use-modal"
        open={visible}
        title="图片库"
        okButtonProps={{
          ghost: true,
          type: 'primary',
        }}
        cancelButtonProps={{
          ghost: true,
        }}
        onCancel={onCancel}
        onOk={onOk}
        zIndex={1050}
        width={962}
      >
        <div className="design-img-use-panel">
          <div className="img-use-nav">
            <Radio.Group
              className="ml-radio-group"
              defaultValue={iImageType.SYSTEM}
              buttonStyle="solid"
            >
              <Radio.Button className="ml-btn" value={iImageType.SYSTEM}>
                系统内置图片
              </Radio.Button>
              <Radio.Button className="ml-btn" value={iImageType.CUSTOM}>
                自定义图片
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="img-use-content-wrap">
            <div className="img-use-content">
              <div className="img-use-content-header">
                <div className="img-use-content-header-left"></div>
                <div className="img-use-content-header-right"></div>
              </div>
              <div className="img-use-content-body">
                <div className="grid-container">
                  {_imgList?.map((item) => (
                    <div
                      className={`img-use-card ${item?.id === selectedItem?.id ? '--selected' : ''
                        }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        className="design-pro-image"
                        src={`https://blog.eirds.cn/image.php?url=${item?.thumbnail?.includes('http') ? '' : 'https:'}` + item?.thumbnail} />

                      <div className="--name ellipsis" title={item?.name}>
                        {item?.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="dark-modal"
        open={previewVisible}
        title="预览"
        footer={false}
        onCancel={() => setPreviewVisible(false)}
        onOk={() => setPreviewVisible(false)}
        zIndex={1050}
        width={890}
      >
        <img
          className="design-pro-image"
          src={'https://blog.eirds.cn/image.php?url=' + value}
        />
      </Modal>
    </>
  );
}
