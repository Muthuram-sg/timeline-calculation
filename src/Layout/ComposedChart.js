import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    level1: [0,400],
    level2: [400,800],
    level3: [800,1000],
    level4: [1000,1200],
    level5: [1200,1400*1.5]
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    level1: [0,400],
    level2: [400,800],
    level3: [800,1000],
    level4: [1000,1200],
    level5: [1200,1400*1.5]
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    level1: [0,400],
    level2: [400,800],
    level3: [800,1000],
    level4: [1000,1200],
    level5: [1200,1400*1.5]
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    level1: [0,400],
    level2: [400,800],
    level3: [800,1000],
    level4: [1000,1200],
    level5: [1200,1400*1.5]
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    level1: [0,400],
    level2: [400,800],
    level3: [800,1000],
    level4: [1000,1200],
    level5: [1200,1400*1.5]
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    level1: [0,400],
    level2: [400,800],
    level3: [800,1000],
    level4: [1000,1200],
    level5: [1200,1400*1.5]
  },
];

function FillChart() {
  const demoUrl = 'https://codesandbox.io/p/sandbox/vertical-composed-chart-6r8xmw'; 
    return (
        
        <div class="body">
            <div class="form" style={{height: "90vh"}}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="horizontal"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" type="category"  />
          <YAxis  type="number"/>
          <Tooltip />
          <Legend />
          <Area dataKey="level1" fill="#F40B0B" stroke="#F40B0B" />
          <Area dataKey="level2" fill="#FFC300" stroke="#FFC300" />
          <Area dataKey="level3" fill="#0FF40B" stroke="#0FF40B" />
          <Area dataKey="level4" fill="#FFC300" stroke="#FFC300" />
          <Area dataKey="level5" fill="#F40B0B" stroke="#F40B0B" />
          {/* <Bar dataKey="pv" barSize={20} fill="#413ea0" /> */}
          <Line dataKey="uv" stroke="#0B4BF4" />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
      </div>
    ); 
}
export default FillChart;
