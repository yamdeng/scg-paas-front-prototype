/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Area
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <React.Fragment>
        <rect
          x={x - 23}
          y={y + 7}
          width="45"
          height="20"
          rx="7"
          ry="7"
          fill="#1597ff"
          strokeWidth="0"
          opacity="blue"
        />
        <text
          x={x}
          y={y + 20}
          fill={'#fff'}
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
          style={{ border: 'solid 6px black' }}
        >
          {value}
        </text>
      </React.Fragment>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

const getPath = (x, y, width, height, radius) => {
  return `M${x},${y + radius}
          a${radius},${radius} 0 0 1 ${radius},-${radius}
      h${width - radius * 2}
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius * 2}
      a${radius},${radius} 0 0 1 -${radius},${radius}
      h${radius - width + radius}
      a${radius},${radius} 0 0 1 -${radius},-${radius}
      Z`;
};

const TriangleBar = props => {
  const { fill, x, y, width, height, radius } = props;
  return (
    <path d={getPath(x, y, width, height, radius)} stroke="none" fill={fill} />
  );
};

export default class Recharts extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '100%', overflow: 'scroll' }}>
          <LineChart
            width={1500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              label={<CustomizedLabel />}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#82ca9d"
              isAnimationActive={false}
            />
          </LineChart>
        </div>
        <hr />
        <div style={{ width: '100%', overflow: 'scroll' }}>
          <ComposedChart width={730} height={250} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar
              dataKey="pv"
              barSize={20}
              fill="#413ea0"
              shape={<TriangleBar radius={5} />}
              barSize={15}
            />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </div>
      </React.Fragment>
    );
  }
}
