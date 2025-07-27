import React, { Component } from 'react';
import { ClipboardList, Activity, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMonthlyRecords } from '../../store/dashboardSlice';
import { RootState } from '../../store';
import TruckingRecords from '../../components/BookingSystem/TruckingRecords/TruckingRecords';

interface MonthlyRecord {
  name: string;
  value: number;
  total?: number;
}

interface Overview {
  title: string;
  overviewType: number;
}

interface Props {
  monthlyRecords: MonthlyRecord[];
  fetchMonthlyRecords: () => void;
}

interface State {
  avgTrips: number;
  totalBookings: number;
  overview: Overview;
  visibleColumns: string[];
  theaders: { key: string; label: string }[];
}

class TruckingRecord extends Component<Props, State> {
  state: State = {
    avgTrips: 0,
    totalBookings: 0,
    overview: {
      title: 'All Transactions',
      overviewType: 1,
    },
    visibleColumns: [],
    theaders: [],
  };

  componentDidMount() {
    this.props.fetchMonthlyRecords();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.monthlyRecords !== this.props.monthlyRecords) {
      const total = this.props.monthlyRecords.reduce(
        (acc, record) => acc + (record.total ?? record.value),
        0
      );
      const avg = this.props.monthlyRecords.length
        ? Math.round(total / this.props.monthlyRecords.length)
        : 0;

      this.setState({
        avgTrips: avg,
        totalBookings: total,
      });
    }
  }

  // Called by TruckingRecords to provide available columns
  getHeaders = (headers: { key: string; label: string }[]) => {
    this.setState({
      theaders: headers,
      visibleColumns: headers.map((header) => header.key), // All visible by default
    });
  };

  // Optional: dynamically update visible columns (e.g. with checkbox UI later)
  setVisibleColumns = (columns: string[]) => {
    this.setState({ visibleColumns: columns });
  };

  render() {
    const { avgTrips, totalBookings, overview, visibleColumns } = this.state;

    return (
      <div className="h-full flex flex-col">
        {/* Top 20% with Cards */}
        <div className="flex-[0_0_20%] grid grid-cols-3 gap-4">
          <Link
            to="/booking-system"
            className="bg-[#676565] p-4 rounded-2xl shadow flex items-center gap-4 hover:opacity-90 transition"
          >
            <div className="rounded-full">
              <Monitor className="text-white w-15 h-15" />
            </div>
            <div>
              <p className="text-4xl font-bold text-white">Go to Booking System</p>
            </div>
          </Link>

          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <ClipboardList className="text-green-600 w-9 h-9" />
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month's Bookings</p>
              <p className="text-3xl font-semibold">{totalBookings}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Activity className="text-yellow-600 w-9 h-9" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Trips / Month</p>
              <p className="text-3xl font-semibold">{avgTrips}</p>
            </div>
          </div>
        </div>

        {/* Bottom 80% with Table */}
        <div className="flex-1 pt-2">
          <div className="flex justify-end items-center space-x-3">
            {/* Generate Report Button */}
            <button className="bg-[#03449A] text-white px-5 py-2 rounded-lg shadow hover:bg-[#023377] transition">
              Generate Report
            </button>
            {/* Search Field */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
                </svg>
              </span>
            </div>
          </div>
          <TruckingRecords
              overview={overview}
              recordTitle={overview.title}
              getHeaders={this.getHeaders}
              visibleColumns={visibleColumns}
              setVisibleColumns={this.setVisibleColumns}
            />
        </div>
      </div>
    );
  }
}

// Redux connections
const mapStateToProps = (state: RootState) => ({
  monthlyRecords: state.dashboard.monthly,
});

const mapDispatchToProps = {
  fetchMonthlyRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckingRecord);
