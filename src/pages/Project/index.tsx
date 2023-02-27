import { addScreen, delScreen, getList } from '@/services/project';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { Button, Form, FormInstance, Input, message, Modal, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

export default function Project() {
  const [projectList, setProject] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm<FormInstance>();

  useEffect(() => {
    getList()
      .then(res => {
        setProject(res?.data || [])
      })
  }, []);

  const onCancel = () => {
    form?.resetFields();
    setModalVisible(false);
  };
  const onOk = async () => {
    await form?.validateFields().then(async ({ name }) => {
      const { data: id } = await addScreen({
        name,
      })
      // console.log('res', res);
      form?.resetFields();
      setModalVisible(false);
      history.push(`/edit?id=${id}`)
      // history.push(`/edit?id=1`);
    });
  };
  const toDelCanvas = async (id: string | number) => {
    const delResult = await delScreen(id)
    if (delResult?.code === 200) {
      getList()
        .then(res => {
          setProject(res?.data || [])
        })
      message.success(delResult?.msg)
    }
  };
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
                        onClick={() => {
                          history.push(`/edit?id=${item?.id}`)
                        }}
                      >
                        编辑
                      </Button>
                    </div>
                    <div className="main-button">
                      <div className="button-span">
                        <EyeOutlined
                          onClick={() => {
                            history.push(`/preview?id=${item?.id}`)
                          }}
                        />
                      </div>
                      <div className="button-span">
                        <Popconfirm
                          title={'是否删除此大屏？'}
                          onConfirm={() => toDelCanvas(item?.id)}
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screen-main">
                <div className="main-name" title={item.name}>
                  {item.name}
                </div>
              </div>
            </div>
          ))}
          <div className={`screen`} key={'add'}>
            <div className="screen-info add">
              <div className="screen-img" />
              <div className="screen-edit">
                <div className="screen-button">
                  <div className="edit-btn">
                    <Button
                      type="primary"
                      style={{
                        borderRadius: 0,
                      }}
                      onClick={() => {
                        setModalVisible(true)
                      }}
                      icon={<PlusOutlined />}
                    >
                      创建大屏
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="screen-main">
              <div className="main-name">{/* 空白模板 */}</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className={`dark-modal`}
        open={modalVisible}
        onCancel={onCancel}
        onOk={onOk}
        title="创建数据大屏"
      >
        <Form name="project-form" form={form} layout="vertical">
          {/* <Form.Item
            name='name'
            label='数据大屏名称'
            required={true}
            rules={[{ required: true, message: '数据大屏名称必须填写' }]}
          >
            <Input />
          </Form.Item> */}
          <ProFormText
            name="name"
            label="数据大屏名称"
            required={true}
            rules={[{ required: true, message: '数据大屏名称必须填写' }]}
          />
        </Form>
      </Modal>
    </div>
  );
}
