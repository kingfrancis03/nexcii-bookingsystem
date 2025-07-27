import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchDashboardStats,
  fetchDailyRecords,
  fetchMonthlyRecords,
  fetchTopCompanies,
  fetchTopDestinations,
} from '../../store/dashboardSlice';
import HorizontalBarChart from '../../components/BarChartHorizontal';
import LineChartComponent from '../../components/LineChart/LineChart';
import { Ship, BookOpen, Coins } from 'lucide-react';

class Dashboard extends Component {
  state = {
    recordType: 'daily',
  };

  componentDidMount() {
    const {
      fetchDashboardStats,
      fetchDailyRecords,
      fetchMonthlyRecords,
      fetchTopCompanies,
      fetchTopDestinations,
    } = this.props;

    fetchDashboardStats();
    fetchDailyRecords();
    fetchMonthlyRecords();
    fetchTopCompanies();
    fetchTopDestinations();
  }

  handleRadioChange = (e) => {
    this.setState({ recordType: e.target.value });
  };

  render() {
    const {
      stats,
      daily,
      monthly,
      topCompanies,
      topDestinations,
    } = this.props;

    const { recordType } = this.state;

    return (
      <div className="flex gap-4 h-full">
        {/* LEFT SIDE */}
        <div className="w-1/2 h-full flex flex-col">
          <div className="h-1/2 overflow-auto m-1">
            <div className="grid grid-cols-2 gap-1 auto-rows-fr h-full">
              <div className="bg-[#03449A] text-white p-4 rounded-2xl shadow">
                <p>Today / {new Date().getFullYear()}</p>
                <p className="text-7xl font-bold">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
              </div>
                  <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Ship className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Vessels</p>
                      <p className="text-3xl font-semibold">{stats?.total_vessels_today ?? 0}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BookOpen className="text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Bookings</p>
                      <p className="text-3xl font-semibold">{stats?.total_bookings_today ?? 0}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Coins className="text-yellow-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Fee Accumulated</p>
                      <p className="text-3xl font-semibold">₱{stats?.total_fees?.toLocaleString() ?? '0'}</p>
                    </div>
                  </div>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="h-1/2 m-1">
            <HorizontalBarChart data={topDestinations} title="Top Destinations" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 h-full flex flex-col">
          {/* Toggle and Chart */}
          <div className="h-1/2 m-1 flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="recordType"
                  value="daily"
                  checked={recordType === 'daily'}
                  onChange={this.handleRadioChange}
                />
                <span>Daily</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="recordType"
                  value="monthly"
                  checked={recordType === 'monthly'}
                  onChange={this.handleRadioChange}
                />
                <span>Monthly</span>
              </label>
            </div>
            <div className="flex-1">
              <LineChartComponent
                data={recordType === 'daily' ? daily : monthly}
                title={recordType === 'daily' ? 'Daily Records' : 'Monthly Records'}
              />
            </div>
          </div>

          {/* Top Companies */}
          <div className="h-1/2 m-1">
            <HorizontalBarChart data={topCompanies} title="Top Companies" />
          </div>
        </div>
      </div>
    );
  }
}

// Redux State Mapping
const mapStateToProps = (state) => ({
  stats: state.dashboard.stats,
  daily: state.dashboard.daily,
  monthly: state.dashboard.monthly,
  topCompanies: state.dashboard.topCompanies,
  topDestinations: state.dashboard.topDestinations,
});

// Redux Dispatch Mapping
const mapDispatchToProps = {
  fetchDashboardStats,
  fetchDailyRecords,
  fetchMonthlyRecords,
  fetchTopCompanies,
  fetchTopDestinations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
