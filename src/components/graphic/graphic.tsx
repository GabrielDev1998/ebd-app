'use client';

import React from 'react';
import styles from './graphic.module.css';

import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export type TypeChartSeries = {
  name?: string;
  data: number[];
};

export type TypeChart = {
  categories: string[] | number[];
  series: TypeChartSeries[];
  titleTooltip?: string;
  options?: ApexOptions;
};

const Graphic = ({ categories, series, titleTooltip, options }: TypeChart) => {
  return (
    <div className={styles.chart}>
      <Chart
        type="bar"
        series={series}
        height={450}
        options={{
          xaxis: {
            categories,
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: '400',
              },
            },
          },
          chart: {
            foreColor: 'var(--textColor)',
            fontFamily: 'inherit',
            toolbar: {
              show: false,
            },
          },
          fill: {
            colors: ['var(--primary)'],
          },
          ...options,
          tooltip: {
            y: {
              title: {
                formatter: function (value) {
                  return titleTooltip ?? value;
                },
              },
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 4,
            },
          },
          grid: {
            borderColor: 'var(--borderColor)',
          },
        }}
      />
    </div>
  );
};
export default Graphic;
