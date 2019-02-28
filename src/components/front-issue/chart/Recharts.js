import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Area,
  ComposedChart,
  BarChart,
  ReferenceArea,
  CartesianAxis,
  ReferenceLine,
  Brush,
  Rectangle,
  Sector,
  Cell,
  AreaChart
} from 'recharts';

const data = [
  {
    name: '3월',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: '4월',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: '5월',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: '6월',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: '7월',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: '8월',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: '9월',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default class Recharts extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 130 }}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <ReferenceArea x1="01" x2="08" label="MAX" />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="name"
              orientation="top"
              axisLine={false}
              tickLine={false}
            />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Line
              type="natural"
              dataKey="pv"
              stroke="#8884d8"
              fill={true}
              activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }}
              legendType="square"
            />
            {/* <Line
              type="monotone"
              backgroundColor="red"
              dataKey="uv"
              stroke="#82ca9d"
              label
            /> */}

            <ReferenceArea />
          </LineChart>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <CartesianAxis tickLine={false} axisLine={false} tick={false} />
            <XAxis dataKey="name" stroke="red" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" shape={<Sector radius={10} />} />
            <Bar dataKey="uv" fill="#82ca9d" />
            <Bar dataKey="uv">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke={'green'}
                  strokeWidth={index === 2 ? 4 : 1}
                />
              ))}
            </Bar>
            {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
          </BarChart>
        </div>

        <div>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            {/* <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            /> */}
            {/* <ReferenceArea
              x1={50}
              x2={80}
              y1={100}
              y2={250}
              stroke="red"
              strokeOpacity={1}
            /> */}
            <CartesianGrid
              stroke="red"
              strokeDasharray="5 5"
              width={30}
              height={30}
            />
            <CartesianAxis
              width={30}
              height={30}
              viewBox={{ x: 0, y: 0, width: 30, height: 30 }}
            />
            <Brush />
          </AreaChart>
        </div>

        <div>
          <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid
              stroke="red"
              strokeDasharray="5 5"
              width={30}
              height={30}
            />
            <CartesianAxis
              width={30}
              height={30}
              viewBox={{ x: 0, y: 0, width: 30, height: 30 }}
            />
            <Bar type="monotone" dataKey="uv" fill="#8884d8" barSize={30} />
          </BarChart>
        </div>
      </React.Fragment>
    );
  }
}
