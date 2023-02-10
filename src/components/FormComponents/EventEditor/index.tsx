import React, { useContext, useMemo, useRef, useState } from 'react';
import { Form, Button, Modal, Select } from 'antd';
import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';

import styles from './index.less';
import { EditorContext } from '@/pages/Editor';

const formItemLayout = {
  labelCol: { style: { width: 110 } },
};

function BuildComponentListOptions(
  componentList: any[],
  curComponentConfig: any,
) {
  return componentList
    ?.filter((item) => item.componentId !== curComponentConfig?.componentId)
    ?.map((item) => {
      return {
        label: item?.config?.componentName,
        value: item?.componentId,
      };
    });
}

export default function EventEditor(props) {
  const { value = {}, onChange } = props;
  const [state, dispatch] = useContext(EditorContext);
  const { curComponentConfig, componentList } = state;
  console.log(componentList);
  const componentListOptions = useMemo(
    () => BuildComponentListOptions(componentList, curComponentConfig),
    [],
  );
  const monacoRef = useRef();
  const [code, setCode] = useState(JSON.stringify(value));
  const [visible, setVisible] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    value?.filterParams?.map((item: any) => item.key),
  );
  const columns: ProColumns[] = [
    {
      title: '参数名',
      dataIndex: 'key',
      editable: false,
      // width: 28,
    },
    {
      title: '运算符',
      dataIndex: 'mapping',
      // width: 60,
      fieldProps: {
        placeholder: '',
      },
    },
    {
      title: '参数值',
      dataIndex: 'valueKey',
      valueType: 'select',
    },
  ];

  const [form] = Form.useForm();
  function onCodeChange(newValue, e) {
    try {
      setCode(newValue);
    } catch (error) {
      console.error('数据格式出错');
    }
  }

  function formatCode() {
    monacoRef?.current?.trigger('anyString', 'editor.action.formatDocument');
  }

  function onCancel() {
    setCode(JSON.stringify(value));
    setVisible(false);
  }

  function onOk() {
    onChange(form.getFieldsValue());
    setVisible(false);
  }
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
          formatCode();
        }}
        ghost
      >
        编辑
      </Button>
      <Modal
        className="dark-modal"
        open={visible}
        title="交互设计"
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
        width={'40%'}
      >
        <ProForm
          form={form}
          {...formItemLayout}
          submitter={false}
          layout="horizontal"
          // onFinish={onFinish}
          // initialValues={defaultValue}
          // onValuesChange={handlechange}
        >
          <ProFormSelect
            label="动作"
            name="action"
            initialValue={'linkage'}
            options={[
              {
                label: '联动',
                value: 'linkage',
              },
            ]}
          />
          <ProFormSelect
            label="联动组件"
            name="componentId"
            options={componentListOptions}
          />
          <ProFormSelect
            label="组件动作"
            name="cmpAction"
            initialValue={'refresh'}
            allowClear={false}
            options={[
              {
                label: '筛选数据',
                value: 'filter',
              },
              {
                label: '刷新数据',
                value: 'refresh',
              },
            ]}
          />
          <ProFormDependency name={['cmpAction']}>
            {({ cmpAction }) => {
              if (cmpAction !== 'filter') {
                return;
              }
              return (
                <Form.Item label="筛选参数设置" name="filterParams">
                  <EditableProTable
                    headerTitle={null}
                    columns={columns}
                    rowKey="key"
                    value={value?.filterParams || []}
                    onChange={onChange}
                    toolBarRender={false}
                    recordCreatorProps={false}
                    editable={{
                      type: 'multiple',
                      editableKeys,
                      onValuesChange: (record, recordList) => {
                        onChange(recordList);
                      },
                      onChange: setEditableRowKeys,
                    }}
                  />
                </Form.Item>
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Modal>
    </>
  );
}
