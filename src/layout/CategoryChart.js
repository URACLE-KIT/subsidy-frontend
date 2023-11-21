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
        margin={{ top: 40, right: 30, bottom: 80, left: 30 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={11}
        arcLinkLabelsTextColor={{ theme: 'background' }}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ theme: 'background' }}
        arcLabel={e=>e.value}
        arcLabelsRadiusOffset={0.55}
        arcLabelsTextColor="black"
        
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 70,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'top-to-bottom',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>
  );
};

export default CategoryChart;
