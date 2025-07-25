import React, { Component, ReactNode } from 'react';
import { Plus } from 'lucide-react';
import TaskBar from '../../../Taskbar';
import FooterPagination from '../../../FooterPagination';
import TruckingRecords from '../../TruckingRecords/TruckingRecords';

interface TransactionsTabProps {

}

interface TransactionsTabState {
    currentPage: number,
    overview: {
        title: string,
        overviewType: number
    }
    theaders: [{
        key: string,
        label: any
    }]
    visibleColumns: []
}

class TransactionsTab extends Component<TransactionsTabProps, TransactionsTabState> {
  state = {
    currentPage: 1,
    overview: {
        title: 'All Transactions',
        overviewType: 1
    },
    theaders: [{}],
    visibleColumns: []
  };

  changeOverview = (index) => {
    const overviewList = [
        {
            title: 'All Transactions',
            overviewType: 1
        },
        {
            title: "Today's Transactions",
            overviewType: 2
        },
        {
            title: "This Month's Transactions",
            overviewType: 3
        },
    ]
    this.setState({overview: overviewList[index]})
  }

  getHeaders = (theaders) => {
    this.setState({theaders: theaders})
  }

  handleColumnChange = (newVisibleColumns) => {
    console.log(newVisibleColumns);
    this.setState({ visibleColumns: newVisibleColumns });
  }

  setVisibleColumns = (visibleColumns) => {
    console.log(visibleColumns);
    
    this.setState({ visibleColumns: visibleColumns });
  }

  render() {
    return (
    <div className="flex flex-col h-full">

    {/* Taskbar (fixed under header) */}
        <div className="shrink-0">
            <TaskBar
                changeOverview={this.changeOverview}
                onToggleColumn={this.handleColumnChange}
                theaders={this.state.theaders}
            />
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
            <TruckingRecords
                overview={this.state.overview}
                recordTitle={this.state.overview.title}
                getHeaders={this.getHeaders}
                visibleColumns={this.state.visibleColumns}
                setVisibleColumns={this.setVisibleColumns}
            />
        </div>
    </div>
    );
  }
}

export default TransactionsTab;
