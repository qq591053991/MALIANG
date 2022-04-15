import React from 'react';
import LeftBar from '@/components/LeftBar';
import CanvasContent from '@/components/CanvasContent';
import RightBar from '@/components/RightBar';

export default function Editor() {
  return <div>
    <LeftBar></LeftBar>
    <CanvasContent></CanvasContent>
    <RightBar></RightBar>
  </div>;
}
