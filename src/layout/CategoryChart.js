import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const transformData = (data) => {
  const clonedData = [...data];

  clonedData.sort((a, b) => b.value - a.value);

  const otherSum = clonedData.slice(3).reduce((acc, entry) => acc + entry.value, 0);

  const transformedData = clonedData.slice(0, 3).concat({
    id: '기타',
    value: otherSum,
  });

  const total = transformedData.reduce((acc, entry) => acc + entry.value, 0);

  const finalData = transformedData.map(entry => ({
    ...entry,
    value: parseFloat((entry.value / total * 100).toFixed(2)),
  }));

  return finalData;
};

const CategoryChart = ({ data }) => {
  const transformedData = transformData(data);

  return (
    <div style={{ height: '400px' }}>
      <ResponsivePie
        data={transformedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        sliceLabel={(entry) => `${entry.value.toFixed(2)}%`}
      />
    </div>
  );
};

export default CategoryChart;
