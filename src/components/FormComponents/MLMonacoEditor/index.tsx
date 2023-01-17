import React, { useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { Button, Modal } from 'antd';

import styles from './index.less';

export default function MLMonacoEditor(props) {
  const { value, onChange } = props;
  const monacoRef = useRef();
  const [code, setCode] = useState(JSON.stringify(value));
  const [visible, setVisible] = useState(false);
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
        title="数据"
        okButtonProps={{
          ghost: true,
          type: 'primary',
        }}
        cancelButtonProps={{
          ghost: true,
        }}
        onCancel={onCancel}
        onOk={onOk}
        zIndex={9999}
        width={'60%'}
      >
        <MonacoEditor
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
        />
      </Modal>
    </>
  );
}

export { monaco };
