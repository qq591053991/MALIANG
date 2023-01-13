import React from 'react';

export default function Text(props) {
  console.log(props);
  const { text, color, fontSize } = props;
  return <div style={{ color, fontSize }}>{text}</div>;
}
