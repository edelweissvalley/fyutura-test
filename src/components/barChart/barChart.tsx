import * as React from 'react';
import {Bar} from 'react-chartjs-2';

/**
 * Получив все данные создаём финальный Map для ввода в гистограмму
 * @param max - максимальное значение
 * @param min - минимальное значение
 * @param step - шаг в гистограмме
 * @param values - список значений от сервера
 */
function getBarChartData(
  max: number, min: number, step: number, values: number[]
): Map<number, number> {
  const amounts: Map<number, number> = new Map();

  for (let i = min; i < max; i += step) {
    amounts.set(i, 0);
  }

  /**
   * Сортировка подсчитывает количество
   * значений для каждого промежутка,
   * путём минимального обхода по вводным значениям
   */
  values.forEach((value: number) => {
    let key = 0;

    if (value === max) {
      key = value - step;
    } else if (value === min) {
      key = value;
    } else {
      if (value < 0) {
        key = value + -(value % step) - step;
      } else if (value >= 0) {
        key = value - (value % step);
      }
    }

    amounts.set(key, amounts.get(key) as number + 1);
  });

  return amounts;
}

/**
 * Гистограмма кол-ва значений по возможным промежуткам с шагом 10
 * @param values - данные с свервера
 */
export function barChart(values: number[]): JSX.Element {
  const step = 10;
  const data = getBarChartData(100, -100, step, values);

  return (
    <Bar
      height={400}
      data={{
        labels: Array
          .from(data.keys())
          .map((v: number) => (`${v} - ${v + step}`)),
        datasets: [
          {
            label: 'Гистограмма кол-ва значений по возможным промежуткам с шагом 10',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: Array.from(data.values())
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        scales: {yAxes: [{ticks: {stepSize: 1}}]}
      }}
    />
  );
}
