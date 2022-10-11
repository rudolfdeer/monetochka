import { max, scaleLinear, scalePoint } from 'd3';
import { Svg, G, Line, Rect, Text } from 'react-native-svg';

const GRAPH_MARGIN = 50;
const GRAPH_BAR_WIDTH = 10;
const SVG_HEIGHT = 250;
const SVG_WIDTH = 400;

const graphHeight = SVG_HEIGHT - 2 * GRAPH_MARGIN;
const graphWidth = SVG_WIDTH - 2 * GRAPH_MARGIN;

interface Data {
  label: string;
  value: number;
  color: string;
}

type BarChartProps = {
  data: Data[];
};

export default function BarChart({ data }: BarChartProps) {
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = scalePoint().domain(xDomain).range(xRange).padding(1);
  const maxValue = max(data, (item) => item.value);
  const topValue = Math.ceil(maxValue);
  const yDomain = [0, topValue];
  const yRange = [0, graphHeight];
  const y = scaleLinear().domain(yDomain).range(yRange);

  const middleValue = topValue / 2;

  return (
    <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      <G y={graphHeight + GRAPH_MARGIN}>
        <Text
          x={graphWidth}
          textAnchor="end"
          y={y(topValue) * -1 - 5}
          fontSize={12}
          fill="black"
          fillOpacity={0.4}
        >
          {topValue}
        </Text>
        <Line
          x1="0"
          y1={y(topValue) * -1}
          x2={graphWidth}
          y2={y(topValue) * -1}
          stroke="black"
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
        />
        <Line
          x1="0"
          y1={y(middleValue) * -1}
          x2={graphWidth}
          y2={y(middleValue) * -1}
          stroke="black"
          strokeDasharray={[3, 3]}
          strokeWidth="0.5"
        />
        <Line
          x1="0"
          y1="2"
          x2={graphWidth}
          y2="2"
          stroke="black"
          strokeWidth="0.5"
        />
        {data.map((item) => (
          <Rect
            key={'bar' + item.color + data.indexOf(item)}
            x={x(item.label) - GRAPH_BAR_WIDTH / 2}
            y={y(item.value) * -1}
            rx={2.5}
            width={GRAPH_BAR_WIDTH}
            height={y(item.value)}
            fill={item.color}
          />
        ))}
        {data.map((item) => (
          <Text
            key={'label' + item.color + data.indexOf(item)}
            fontSize="14"
            x={x(item.label)}
            y="25"
            textAnchor="middle"
          >
            {item.label}
          </Text>
        ))}
      </G>
    </Svg>
  );
}
