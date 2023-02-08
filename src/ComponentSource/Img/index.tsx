import React from 'react';

export default function Img(props) {
  const { url, Img } = props;
  return (
    <img
      style={{
        width: '100%',
        height: '100%',
      }}
      src={require('./imgs/background1.png')}
    />
  );
}
