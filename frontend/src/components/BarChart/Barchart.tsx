import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

class BarChartComponent extends Component {
  render() {
    const { data, width = 500, height = 300, xKey = 'name', barKey = 'value' } = this.props;

    return (
      <BarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={barKey} fill="#8884d8" />
      </BarChart>
    );
  }
}

export default BarChartComponent;
