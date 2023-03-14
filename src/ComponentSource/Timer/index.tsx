import React, { useState } from 'react';
import { useInterval } from 'ahooks';
import moment from 'moment';

const weekDayMap: Record<number, string> = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
};

export default function Timer(props) {
  const {
    formatterStr = 'YYYY-MM-DD hh:mm:ss',
    showWeekDay,
    color,
    textShadow,
    backgroundColor,
    fontSize,
    fontFamily,
  } = props;
  const [timer, setTimer] = useState(moment().format(formatterStr));
  useInterval(() => {
    setTimer(moment().format(formatterStr));
  }, 1000);

  const weekDay = `星期${weekDayMap[moment().startOf('month').day()]}`;
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
      {timer}
      {showWeekDay && (
        <>
          <br />
          {weekDay}
        </>
      )}
    </div>
  );
}
