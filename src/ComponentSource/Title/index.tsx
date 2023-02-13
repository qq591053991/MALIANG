import React from 'react';

export default function Text(props) {
  const { text, color, textShadow, backgroundColor, fontSize } = props;
  return (
    <div
      style={{
        color,
        fontSize,
        backgroundColor,
        textShadow,
        width: '100%',
        height: '100%',
      }}
    >
      {text}
    </div>
  );
}
