import React from 'react';

export default function Text(props) {
  const { text, color, textShadow, backgroundColor, fontSize, fontFamily } = props;
  return (
    <div
      style={{
        color,
        fontSize,
        fontFamily,
        backgroundColor,
        textShadow: `${textShadow} 0 0 6px`,
        width: '100%',
        height: '100%',
      }}
    >
      {text}
    </div>
  );
}
