import React from "react";
import {
  XAxis,
  YAxis,
  Area,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const getIntersectionColor = (_intersection, isLast) => {
  if (isLast) {
    return _intersection.line1isHigherNext ? "red" : "blue";
  }

  return _intersection.line1isHigher ? "red" : "blue";
};

const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      level1: 400,
      level2: 800,
      level3: 1000,
      level4: 1200,
      level5: 1400
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      level1: 400,
      level2: 800,
      level3: 1000,
      level4: 1200,
      level5: 1400
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      level1: 400,
      level2: 800,
      level3: 1000,
      level4: 1200,
      level5: 1400
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      level1: 400,
      level2: 800,
      level3: 1000,
      level4: 1200,
      level5: 1400
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      level1: 400,
      level2: 800,
      level3: 1000,
      level4: 1200,
      level5: 1400
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      level1: 400,
      level2: 800,
      level3: 1000,
      level4: 1200,
      level5: 1400
    },
  ];
// Solution is not very scalable
// - need to tweak it to use nulls
export const FillChart2 = (props) => {
//   const { data, id } = props;

  // add `range` to data for Area
  const dataWithRange = data.map((d) => ({
    ...d,
    range1:
      d.level1 !== undefined && d.level2 !== undefined
        ? [0, d.level1]
        : []
        ,
    range2:
      d.level2 !== undefined && d.level3 !== undefined
        ? [d.level1, d.level2]
        : [],    
    range3:
        d.level3 !== undefined && d.level4 !== undefined
          ? [d.level2, d.level3]
          : [],    
    range4:
        d.level3 !== undefined && d.level4 !== undefined
        ? [d.level2, d.level3]
        : [],    
    range5:
        d.level3 !== undefined && d.level4 !== undefined
            ? [d.level2, d.level3]
            : []
  }));

  

  return (
    <div class="body">
            <div class="form" style={{height: "90vh"}}>
            <ResponsiveContainer width="100%" aspect={2}>
            <ComposedChart
                data={dataWithRange}
                margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
                }}
            >
                <XAxis
                dataKey="index"
                tickLine={false}
                tick={() => null}
                strokeWidth={1}
                />
                <YAxis
                tickCount={5}
                tickLine={false}
                allowDecimals={false}
                strokeWidth={1}
                />

                <Area
                dataKey="range"
                stroke="#8884d8"
                strokeWidth={0}
                fill="#8884d8"
                />

                <Line
                type="linear"
                dataKey="level1"
                strokeWidth={3}
                stroke="#5951FF"
                dot={false}
                />
                <Line
                type="linear"
                dataKey="level2"
                strokeWidth={3}
                stroke="#5CD6C2"
                dot={false}
                />
            </ComposedChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  const line1isHigher = y1 > y3;
  const line1isHigherNext = y2 > y4;

  return { x, y, line1isHigher, line1isHigherNext };
}
export default FillChart2;