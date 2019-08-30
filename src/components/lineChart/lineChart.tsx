import * as React from 'react';
import {Line} from 'react-chartjs-2';

import {itemType} from 'src/components/App';

/**
 * Со всех данных вынимаем время в нужной форме
 * @param data - данные от сервера
 */
function getTime(data: itemType[]): string[] {
  return data.map(({timestamp: t}: itemType) => {
    const date = new Date(t);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  });
}

/**
 * Отрисовка линейного чарта
 * @param data - данные от сервера
 */
export function lineChart(data: itemType[]): JSX.Element {
  return (
    <Line height={50} data={{
      labels: getTime(data),
      datasets: [
        {
          lineTension: 0.1, backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)', borderCapStyle: 'butt',
          borderDash: [], borderDashOffset: 0, borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)', fill: false,
          pointBackgroundColor: '#fff', pointBorderWidth: 1,
          pointHoverRadius: 5, label: 'График зависимости значений по времени',
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2, pointRadius: 1, pointHitRadius: 10,
          data: data.map(({value}: itemType) => (value))
        }
      ]
    }}
    />
  );
}
