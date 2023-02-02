import React from 'react';
import { Button } from 'antd';

export default function MLButton(props) {
  const { text, ClickEvent } = props;
  return (
    <Button
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        lineHeight: 1.5,
      }}
      onClick={() => ClickEvent?.()}
    >
      {text}
    </Button>
  );
}
