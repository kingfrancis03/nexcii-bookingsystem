import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

class HorizontalBarChart extends Component {
  // Utility to find the likely label & value keys
  getKeys = (data) => {
    if (!data || data.length === 0) return { labelKey: 'label', valueKey: 'value' };

    const sample = data[0];
    const keys = Object.keys(sample);

    const labelKey = keys.find(k =>
      ['label', 'name', 'title', 'category'].includes(k.toLowerCase())
    ) || keys[0];

    const valueKey = keys.find(k =>
      ['value', 'count', 'total', 'amount'].includes(k.toLowerCase())
    ) || keys[1] || keys[0];

    return { labelKey, valueKey };
  };

  render() {
    const { data, title = 'Chart Title' } = this.props;
    const { labelKey, valueKey } = this.getKeys(data);

    return (
      <div
        style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          {title}
        </h5>

        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey={labelKey} tick={{ fontSize: 12, fill: '#03449A' }}/>
              <Tooltip />
              <Bar dataKey={valueKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default HorizontalBarChart;
