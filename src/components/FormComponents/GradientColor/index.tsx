import React, { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import { getGradientType, getDegrees } from './utils/utils';
import { low, high, getColors, formatInputValues } from './utils/formatters';

export type ColorConfigType = string;

//value 初始值传来，onchange item给的回调
interface ColorProps {
  value?: ColorConfigType;
  onChange?: (v: ColorConfigType) => void;
}

export function getGradientObject(value: string) {
  const isGradient = value?.includes('gradient');
  if (value) {
    const colors = getColors(value);
    if (isGradient) {
      const gradientType = getGradientType(value);
      const degreeStr =
        gradientType === 'linear-gradient'
          ? ''.concat(degrees, 'deg')
          : 'circle';
      const degrees = getDegrees(value);
      return {
        isGradient: true,
        gradientType: gradientType,
        degrees: degreeStr,
        colors: colors?.map((c) => ({ ...c, value: c.value?.toLowerCase() })),
      };
    } else {
      return value;
    }
  } else {
    return {};
  }
}

const GradientColorPicker = (props: ColorProps) => {
  const { value = '', onChange } = props;
  const [pickerVisible, setPickerVisible] = useState(false);
  function handleClick() {
    setPickerVisible(!pickerVisible);
  }
  console.log(value);
  return (
    <div>
      <div
        style={{
          // padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '2px',
            background: `${value}`,
          }}
        />
      </div>
      {pickerVisible ? (
        <React.Fragment>
          <div
            style={{
              position: 'absolute',
              zIndex: 2000,
              left: -114,
            }}
          >
            <ColorPicker
              height={280}
              width={280}
              value={value}
              onChange={onChange}
            />
          </div>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
              zIndex: 1000,
            }}
            onClick={() => setPickerVisible(false)}
          />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default GradientColorPicker;
