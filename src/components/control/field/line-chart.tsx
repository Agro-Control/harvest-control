import { ResponsiveLine } from '@nivo/line'
interface Datum {
    x: string | number | Date;
    y: number | string | null;
}

export interface Serie {
    id: string | number;
    data: Datum[];
}
// Interface para as propriedades do componente
export interface LineGraphProps {
    data: Serie[];
    colors: string[];
    legend: string;
}

export const MyResponsiveLine = ({ data, colors, legend }: LineGraphProps) => {
    const uniqueMonths = Array.from(new Set(data.flatMap(serie => serie.data.map(point => point.x)))).sort();
    console.log('Unique months:', uniqueMonths);
    return (
        <ResponsiveLine
            data={data}
            colors={colors}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            axisBottom={{
                legend: legend,
                legendOffset: 40,
                legendPosition: 'middle',
                tickValues: uniqueMonths,
            }}
            axisLeft={{
                legend: 'Duração (horas)',
                legendPosition: 'middle',
                legendOffset: -65,
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            useMesh={true}
            margin={{ top: 20, right: 150, bottom: 60, left: 80 }}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};




