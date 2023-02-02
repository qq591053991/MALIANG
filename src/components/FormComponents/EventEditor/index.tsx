import React, { useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { Form, Button, Modal, Select } from 'antd';
import {
  ProForm,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';

import styles from './index.less';

const formItemLayout = {
  labelCol: { style: { width: 110 } },
};

export default function EventEditor(props) {
  const { value, onChange } = props;
  const monacoRef = useRef();
  const [code, setCode] = useState(JSON.stringify(value));
  const [visible, setVisible] = useState(false);
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
    onChange(JSON.parse(code));
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
        className={styles['dark-modal']}
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
        <Form
          form={form}
          // name={`form_editor`}
          {...formItemLayout}
          submitter={false}
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
          {/* <ProFormList>
            
          </ProFormList> */}
        </Form>
        {/* <MonacoEditor
          width={'100%'}
          height={400}
          language="json"
          theme="vs-dark"
          value={code}
          onChange={onCodeChange}
          editorDidMount={(editor) => {
            if (!monacoRef.current) {
              monacoRef.current = editor;
            }
            formatCode();
            setCode(editor?.getValue());
          }}
        /> */}
      </Modal>
    </>
  );
}

export { monaco };
