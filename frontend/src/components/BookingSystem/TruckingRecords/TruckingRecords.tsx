import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTruckingRecords } from '../../../store/truckingRecordSlice';
import FooterPagination from '../../FooterPagination';

class TruckingRecords extends Component {
  state = {
    currentPage: 1,
    sortColumn: 'record_date',
    sortDirection: 'desc',
    openDropdownId: null,
  };

  overViewType = [null, 'today', 'this_month'];

  staticHeaders = [
    { key: 'record_date', label: 'Date' },
    { key: 'record_time', label: 'Time' },
    { key: 'destination', label: 'Destination' },
    { key: 'plate_number', label: 'Plate #' },
    { key: 'vessel.vessel_name', label: 'Vessel' },
    { key: 'company.company_name', label: 'Trucking Company' },
    { key: 'creator.name', label: 'Created by' },
  ];

  componentDidMount() {
    this.props.fetchTruckingRecords(0, 10);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.records !== this.props.records &&
      this.props.records.length > 0
    ) {
      const feeHeaders = this.extractFeeHeaders(this.props.records);
      const allHeaders = [
        ...this.staticHeaders,
        ...feeHeaders,
        { key: 'total', label: 'Total' },
      ];
      this.props.getHeaders(allHeaders);
    }

    if (prevProps.overview !== this.props.overview) {
      this.props.fetchTruckingRecords(
        0,
        10,
        this.overViewType[this.props.overview.overviewType - 1]
      );
    }
  }

  extractFeeHeaders = (records) => {
    const feeNames = new Set();
    records.forEach((rec) => {
      (rec.fees || []).forEach((fee) => {
        if (fee.fee?.fee_name) {
          feeNames.add(fee.fee.fee_name);
        }
      });
    });

    return Array.from(feeNames).map((name) => ({
      key: `fees.${name}`,
      label: name.replace(/_/g, ' ').toUpperCase(),
    }));
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.props.fetchTruckingRecords(
      (page - 1) * 10,
      10,
      this.overViewType[this.props.overview.overviewType - 1]
    );
  };

  handleSort = (column) => {
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
    const getValueByPath = (obj, path) =>
      path.split('.').reduce((acc, key) => acc?.[key], obj);

    const getFeeAmount = (fees, feeName) => {
      const match = (fees || []).find((f) => f.fee?.fee_name === feeName);
      return match ? match.amount : 0;
    };

    return [...records].sort((a, b) => {
      let aVal, bVal;

      if (sortColumn === 'total') {
        const getTotal = (rec) =>
          (rec.fees || []).reduce(
            (sum, f) => sum + parseFloat(f.amount || 0),
            0
          );
        aVal = getTotal(a);
        bVal = getTotal(b);
      } else if (sortColumn.startsWith('fees.')) {
        const feeKey = sortColumn.split('.')[1];
        aVal = getFeeAmount(a.fees || [], feeKey);
        bVal = getFeeAmount(b.fees || [], feeKey);
      } else if (sortColumn === 'record_date' || sortColumn === 'record_time') {
        const getDateTimeValue = (rec) =>
          new Date(`${rec.record_date}T${rec.record_time || '00:00:00'}`);
        aVal = getDateTimeValue(a);
        bVal = getDateTimeValue(b);
      } else {
        aVal = getValueByPath(a, sortColumn);
        bVal = getValueByPath(b, sortColumn);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (aVal instanceof Date && bVal instanceof Date) {
        return sortDirection === 'asc'
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      const aStr = aVal?.toString().toLowerCase() || '';
      const bStr = bVal?.toString().toLowerCase() || '';

      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  render() {
    const {
      loading,
      error,
      total,
      visibleColumns = [],
      recordTitle,
      onEditRecord,
    } = this.props;
    const { currentPage, sortColumn, sortDirection, openDropdownId } =
      this.state;

    if (loading)
      return <p className="p-4 text-sm">Loading trucking records...</p>;
    if (error)
      return <p className="p-4 text-sm text-red-500">Error: {error}</p>;

    const sortedRecords = this.getSortedRecords();
    const totalPages = Math.ceil(total / 10);

    const renderSortIndicator = (column) =>
      sortColumn === column ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

    const allFeeNames = Array.from(
      new Set(
        sortedRecords
          .flatMap((rec) => rec.fees || [])
          .map((f) => f.fee?.fee_name)
      )
    );

    const getFeeAmount = (fees, feeName) => {
      const match = (fees || []).find((f) => f.fee?.fee_name === feeName);
      return match ? match.amount : 0;
    };

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow overflow-auto">
          <h1 className="text-m font-bold mb-2">{recordTitle}</h1>
          <table className="w-full bg-white shadow rounded text-s text-center">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                {this.staticHeaders.map((header) =>
                  visibleColumns.includes(header.key) ? (
                    <th
                      key={header.key}
                      className="p-2 cursor-pointer"
                      onClick={() => this.handleSort(header.key)}
                    >
                      {header.label}
                      {renderSortIndicator(header.key)}
                    </th>
                  ) : null
                )}

                {allFeeNames.map((feeName) => {
                  const feeKey = `fees.${feeName}`;
                  return visibleColumns.includes(feeKey) ? (
                    <th
                      key={feeKey}
                      className="p-2 cursor-pointer"
                      onClick={() => this.handleSort(feeKey)}
                    >
                      {feeName.replace(/_/g, ' ').toUpperCase()}
                      {renderSortIndicator(feeKey)}
                    </th>
                  ) : null;
                })}

                {visibleColumns.includes('total') && (
                  <th
                    className="p-2 cursor-pointer"
                    onClick={() => this.handleSort('total')}
                  >
                    Total{renderSortIndicator('total')}
                  </th>
                )}

                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={6 + allFeeNames.length}
                    className="p-4 text-sm text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                sortedRecords.map((rec) => {
                  const total = allFeeNames.reduce(
                    (sum, name) =>
                      sum + parseFloat(getFeeAmount(rec.fees || [], name)),
                    0
                  );

                  return (
                    <tr key={rec.id} className="border-t hover:bg-gray-50">
                      {visibleColumns.includes('record_date') && (
                        <td className="p-1">{rec.record_date}</td>
                      )}
                      {visibleColumns.includes('record_time') && (
                        <td className="p-1">{rec.record_time}</td>
                      )}
                      {visibleColumns.includes('destination') && (
                        <td className="p-1">{rec.destination}</td>
                      )}
                      {visibleColumns.includes('plate_number') && (
                        <td className="p-1">{rec.plate_number}</td>
                      )}
                      {visibleColumns.includes('vessel.vessel_name') && (
                        <td className="p-1">{rec.vessel?.vessel_name}</td>
                      )}
                      {visibleColumns.includes('company.company_name') && (
                        <td className="p-1">{rec.company?.company_name}</td>
                      )}
                      {visibleColumns.includes('creator.name') && (
                        <td className="p-1">{rec.creator?.name}</td>
                      )}

                      {allFeeNames.map((feeName) => {
                        const feeKey = `fees.${feeName}`;
                        return visibleColumns.includes(feeKey) ? (
                          <td key={feeKey} className="p-1 text-[10px]">
                            ₱{getFeeAmount(rec.fees || [], feeName).toFixed(2)}
                          </td>
                        ) : null;
                      })}

                      {visibleColumns.includes('total') && (
                        <td className="p-1 text-[10px]">
                          ₱{total.toFixed(2)}
                        </td>
                      )}

                      <td className="relative p-1">
                        <div className="relative inline-block text-left">
                          <button
                            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200"
                            onClick={() =>
                              this.setState({
                                openDropdownId:
                                  openDropdownId === rec.id ? null : rec.id,
                              })
                            }
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <circle cx="12" cy="5" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="12" cy="19" r="2" />
                            </svg>
                          </button>

                          {openDropdownId === rec.id && (
                            <div className="absolute right-0 z-10 w-28 mt-2 bg-white border border-gray-200 rounded shadow-md">
                              <button
                                onClick={() => {
                                  onEditRecord?.(rec);
                                  this.setState({ openDropdownId: null });
                                }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  console.log('Cancel clicked', rec);
                                  this.setState({ openDropdownId: null });
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {sortedRecords.length > 0 && (
            <div className="px-4 py-2 self-end">
              <FooterPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            </div>
          )}
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
