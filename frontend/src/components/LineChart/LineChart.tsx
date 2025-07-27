import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class LineChartComponent extends Component {
  // Utility to find the likely label & value keys
  getKeys = (data) => {
    if (!data || data.length === 0) return { labelKey: 'label', valueKey: 'value' };

    const sample = data[0];
    const keys = Object.keys(sample);

    const labelKey =
      keys.find((k) =>
        ['label', 'name', 'title', 'category', 'date', 'day'].includes(k.toLowerCase())
      ) || keys[0];

    const valueKey =
      keys.find((k) =>
        ['value', 'count', 'total', 'amount'].includes(k.toLowerCase())
      ) || keys[1] || keys[0];

    return { labelKey, valueKey };
  };

  render() {
    const { data, title = 'Line Chart' } = this.props;
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
            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={labelKey} tick={{ fontSize: 12, fill: '#03449A' }}/>
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={valueKey}
                stroke="#e5b711ff"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default LineChartComponent;
