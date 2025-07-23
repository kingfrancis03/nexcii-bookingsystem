import React, { Component, ReactNode } from 'react';
import { Plus } from 'lucide-react';
import TaskBar from '../../../Taskbar';
import FooterPagination from '../../../FooterPagination';
import TruckingRecords from '../../TruckingRecords/TruckingRecords';

interface TransactionsTabProps {

}


class TransactionsTab extends Component<TransactionsTabProps, { currentPage: number }> {
  state = {
    currentPage: 1,
  };
  testOnClick = (sample_string) => {
    alert(sample_string)
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
    <div className="flex flex-col h-full">

    {/* Taskbar (fixed under header) */}
        <div className="shrink-0">
            <TaskBar testOnClick={this.testOnClick} />
        </div>

        {/* Main content */}
        <div className="shrink-0 px-4 py-2">
            <div className="flex justify-end pb-2">
            <button
                type="button"
                className="flex shadow-md items-center gap-2 py-2.5 px-5 text-sm font-medium text-[#0E75BC] bg-white rounded-lg hover:bg-[#e6f2fa] focus:outline-none cursor-pointer"
            >
                <Plus className="w-4 h-4" />
                Add Booking
            </button>
            </div>
            <TruckingRecords />
        </div>
    </div>
    );
  }
}

export default TransactionsTab;
