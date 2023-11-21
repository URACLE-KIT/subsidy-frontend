import React from 'react';
import { ResponsivePie } from '@nivo/pie';
const toKorean = (englishLabel) => {
  const translationMap = {
      PregnancyChildbirth: '임신출산',
      HousingSelfReliance: '주거자립',
      EmploymentEntrepreneurship: '고용창업',
      AdminStrativeSafety: '행정안전',
      CulturalEnvironment: '문화환경',
      AgricultureLivestockFisheries: '농림축산어업',
      ChildCareEducation: '보육교육',
      DailySafety: '생활안정',
      ProtectiveCare: '보호돌봄',
      HealthCare: '보건의료'
  };

  // 영어 레이블에서 키워드 추출
  const keyword = Object.keys(translationMap).find((key) => englishLabel.includes(key));

  // 번역된 레이블이 있으면 해당 번역 사용, 없으면 원본 레이블 사용
  const koreanLabel = keyword ? translationMap[keyword] : englishLabel;

  return koreanLabel;
};

const transformData = (data) => {
  const clonedData = [...data];
  console.log(clonedData);
  
  // 클론된 데이터 매핑 및 id 값을 한글 번역으로 업데이트
  const translatedData = clonedData.map(entry => ({
    ...entry,
    id: toKorean(entry.id),
  }));
  
  translatedData.sort((a, b) => b.value - a.value);

  const otherSum = translatedData.slice(3).reduce((acc, entry) => acc + entry.value, 0);

  const transformedData = translatedData.slice(0, 3).concat({
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
