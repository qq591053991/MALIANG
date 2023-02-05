import React from 'react';
import { Button } from 'antd';

export default function MLButton(props) {
  const { text, ClickCallback } = props;
  return (
    <Button
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        lineHeight: 1.5,
      }}
      onClick={() => ClickCallback?.()}
    >
      {text}
    </Button>
  );
}
