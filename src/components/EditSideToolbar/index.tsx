import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

interface iProps {
  children: React.ReactElement;
  actived: boolean;
}

// 画布中的组件侧边辅助栏工具
export default function EditSideToolbar(props: iProps) {
  const { children, actived, onCopy, onDelete } = props;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      {children}
      {actived && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            right: '-36px',
            top: 0,
            cursor: 'pointer',
          }}
        >
          <div
            className="item"
            style={{
              fontSize: 20,
              background: '#4af',
              marginBottom: 4,
              padding: '0 6px',
              color: '#fff',
            }}
            onClick={() => onDelete()}
          >
            <DeleteOutlined />
          </div>
          <div
            className="item"
            style={{
              fontSize: 20,
              background: '#4af',
              marginBottom: 4,
              padding: '0 6px',
              color: '#fff',
            }}
            onClick={() => onCopy()}
          >
            <CopyOutlined />
          </div>
        </div>
      )}
    </div>
  );
}
