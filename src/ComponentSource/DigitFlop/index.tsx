import React, { useEffect, useState } from 'react';

export default function DigitFlop(props) {
  const { titleConfig, flop, prefixConfig, suffixConfig, dataSource = [{}] } = props;
  const { duration = 500, splitTime = 50, fixed = 0 } = flop;
  const [{ value: digital, title, prefix, suffix }] = dataSource;
  const [digitNum, setDigitNum] = useState(0);
  function getShowDigit(d, n) {
    let result = [];
    if (n === d) {
      return [];
    }
    const turnNum = Math.floor(duration / splitTime);
    let avgNum = d / turnNum;
    for (let i = 0; i < turnNum; i++) {
      const res = avgNum * (i + 1)
      result.push({
        digit: res.toFixed(fixed),
        speed: splitTime
      })
    }
    return result
  }
  async function turnNumAnimation() {
    let digitList = getShowDigit(digital, digitNum)
    for (let i = 0; i < digitList.length; i++) {
      const item = digitList[i]
      await new Promise((res) => {
        setTimeout(() => {
          res(true)
        }, item.speed)
      })
      setDigitNum(item.digit)
    }
  }
  useEffect(() => {
    if (!digital) {
      return
    }
    turnNumAnimation()
  }, [digital])

  return (
    <div>
      {
        titleConfig && titleConfig?.show && <div
          style={{
            ...titleConfig
          }}
        >
          {title}
        </div>
      }
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline'
        }}
      >
        {
          prefixConfig?.show && <div
            style={{
              ...prefixConfig
            }}
          >
            {
              prefix
            }
          </div>
        }

        <div
          style={{
            ...flop
          }}
        >
          {digitNum}
        </div>

        {
          suffixConfig?.show && <div
            style={{
              ...suffixConfig,
              marginLeft: 4
            }}
          >
            {suffix}
          </div>
        }
      </div>
    </div>
  );
}
