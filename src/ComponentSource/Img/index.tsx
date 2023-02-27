import React from 'react';

interface iImgProps {
  imgUrl: string;
}

export default function Img(props: iImgProps) {
  const { imgUrl = '' } = props;
  // const isLocalImg = imgUrl.startsWith('@/assets');
  return (
    <img
      style={{
        width: '100%',
        height: '100%',
      }}
      src={'https://blog.eirds.cn/image.php?url=' + imgUrl}
    />
  );
}
