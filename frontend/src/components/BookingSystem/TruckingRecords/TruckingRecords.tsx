import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTruckingRecords } from '../../../store/truckingRecordSlice';
import FooterPagination from '../../FooterPagination';

class TruckingRecords extends Component {
  state = {
    currentPage: 1,
    sortColumn: 'record_date',
    sortDirection: 'asc' as 'asc' | 'desc',
  };

  componentDidMount() {
    this.props.fetchTruckingRecords(0, 10);
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
    this.props.fetchTruckingRecords((page - 1) * 10, 10);
  };

  handleSort = (column: string) => {
    this.setState((prevState) => ({
      sortColumn: column,
      sortDirection:
        prevState.sortColumn === column && prevState.sortDirection === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  getSortedRecords = () => {
    const { records } = this.props;
    const { sortColumn, sortDirection } = this.state;

    const getValueByPath = (obj, path) => {
      return path.split('.').reduce((acc, key) => acc?.[key], obj);
    };

    return [...records].sort((a, b) => {
      let aVal, bVal;

      if (sortColumn === 'total') {
        const sum = (r) =>
          ['ppa_fee', 'terminal_fee', 'pcg_fee', 'parking_fee1', 'parking_fee2']
            .map((key) => parseFloat(r[key] || 0))
            .reduce((a, b) => a + b, 0);
        aVal = sum(a);
        bVal = sum(b);
      } else {
        aVal = getValueByPath(a, sortColumn);
        bVal = getValueByPath(b, sortColumn);
      }

      const aStr = aVal?.toString().toLowerCase() || '';
      const bStr = bVal?.toString().toLowerCase() || '';

      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  render() {
    const { loading, error, total } = this.props;
    const { currentPage, sortColumn, sortDirection } = this.state;

    if (loading) return <p className="p-4 text-sm">Loading trucking records...</p>;
    if (error) return <p className="p-4 text-sm text-red-500">Error: {error}</p>;

    const sortedRecords = this.getSortedRecords();
    const totalPages = Math.ceil(total / 10);

    const renderSortIndicator = (column: string) =>
      sortColumn === column ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

    return (
      <div className="flex flex-col min-h-screen bg-[#E6EFF5]">
        <div className="flex-grow overflow-auto">
          <h1 className="text-m font-bold mb-4">All transactions</h1>
          <table className="w-full bg-white shadow rounded text-s text-center">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('record_date')}>
                  Date{renderSortIndicator('record_date')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('record_time')}>
                  Time{renderSortIndicator('record_time')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('destination')}>
                  Destination{renderSortIndicator('destination')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('plate_number')}>
                  Plate #{renderSortIndicator('plate_number')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('vessel.vessel_name')}>
                  Vessel{renderSortIndicator('vessel.vessel_name')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('company.company_name')}>
                  Trucking Company{renderSortIndicator('company.company_name')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('ppa_fee')}>
                  PPA Fee{renderSortIndicator('ppa_fee')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('terminal_fee')}>
                  Terminal Fee{renderSortIndicator('terminal_fee')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('pcg_fee')}>
                  PCG Fee{renderSortIndicator('pcg_fee')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('parking_fee1')}>
                  Parking Fee 1{renderSortIndicator('parking_fee1')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('parking_fee2')}>
                  Parking Fee 2{renderSortIndicator('parking_fee2')}
                </th>
                <th className="p-2 cursor-pointer" onClick={() => this.handleSort('total')}>
                  Total{renderSortIndicator('total')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((rec) => (
                <tr key={rec.id} className="border-t hover:bg-gray-50">
                  <td className="p-1">{rec.record_date}</td>
                  <td className="p-1">{rec.record_time}</td>
                  <td className="p-1">{rec.destination}</td>
                  <td className="p-1">{rec.plate_number}</td>
                  <td className="p-1">{rec.vessel?.vessel_name}</td>
                  <td className="p-1">{rec.company?.company_name}</td>
                  <td className="p-1 text-[10px]">₱{rec.ppa_fee}</td>
                  <td className="p-1 text-[10px]">₱{rec.terminal_fee}</td>
                  <td className="p-1 text-[10px]">₱{rec.pcg_fee}</td>
                  <td className="p-1 text-[10px]">₱{rec.parking_fee1}</td>
                  <td className="p-1 text-[10px]">₱{rec.parking_fee2}</td>
                  <td className="p-2 text-[10px]">
                    ₱ {[
                      rec.ppa_fee,
                      rec.terminal_fee,
                      rec.pcg_fee,
                      rec.parking_fee1,
                      rec.parking_fee2,
                    ]
                      .map((v) => parseFloat(v || 0))
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 self-end">
          <FooterPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.truckingRecords.records,
  loading: state.truckingRecords.loading,
  error: state.truckingRecords.error,
  total: state.truckingRecords.total,
});

const mapDispatchToProps = {
  fetchTruckingRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckingRecords);
