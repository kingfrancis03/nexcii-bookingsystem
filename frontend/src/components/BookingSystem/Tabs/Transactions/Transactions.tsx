import React, { Component } from 'react';
import { Plus } from 'lucide-react';
import { connect } from 'react-redux';
import {
  createTruckingRecordThunk,
  updateTruckingRecordThunk,
} from '../../../../store/truckingRecordSlice';
import TaskBar from '../../../Taskbar';
import TruckingRecords from '../../TruckingRecords/TruckingRecords';
import RecordModal from '../../../RecordModal';

interface TransactionsTabProps {
  createTruckingRecordThunk: (data: any) => void;
  updateTruckingRecordThunk: (id: number, data: any) => void;
  user: {
    userID: number | null;
    username: string | null;
    name: string | null;
    role: string | null;
  };
}

interface RecordData {
  [key: string]: any;
}

interface TransactionsTabState {
  currentPage: number;
  overview: {
    title: string;
    overviewType: number;
  };
  theaders: {
    key: string;
    label: any;
  }[];
  visibleColumns: string[];
  isModalOpen: boolean;
  modalMode: 'add' | 'edit';
  selectedRecord: RecordData | null;
}

class TransactionsTab extends Component<TransactionsTabProps, TransactionsTabState> {
  state: TransactionsTabState = {
    currentPage: 1,
    overview: {
      title: 'All Transactions',
      overviewType: 1,
    },
    theaders: [],
    visibleColumns: [],
    isModalOpen: false,
    modalMode: 'add',
    selectedRecord: null,
  };

  changeOverview = (index: number) => {
    const overviewList = [
      { title: 'All Transactions', overviewType: 1 },
      { title: "Today's Transactions", overviewType: 2 },
      { title: "This Month's Transactions", overviewType: 3 },
    ];
    this.setState({ overview: overviewList[index] });
  };

  getHeaders = (theaders: { key: string; label: any }[]) => {
    this.setState({ theaders });
  };

  handleColumnChange = (newVisibleColumns: string[]) => {
    this.setState({ visibleColumns: newVisibleColumns });
  };

  setVisibleColumns = (visibleColumns: string[]) => {
    this.setState({ visibleColumns });
  };

  openAddModal = () => {
    this.setState({
      isModalOpen: true,
      modalMode: 'add',
      selectedRecord: null,
    });
  };

  openEditModal = (record: RecordData) => {
    const sanitizedFees = record.fees?.map((fee: any) => ({
      fee_name: fee.fee?.fee_name || '',
      amount: fee.amount || 0,
    })) || [];

    const transformedRecord = {
      ...record,
      fees: sanitizedFees,
    };

    this.setState({
      isModalOpen: true,
      modalMode: 'edit',
      selectedRecord: transformedRecord,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleModalSubmit = (data: RecordData) => {
    const { user, createTruckingRecordThunk, updateTruckingRecordThunk } = this.props;
    const { modalMode, selectedRecord } = this.state;
    console.log(data);

    if (modalMode === 'add') {
      const recordWithUser = {
        ...data,
        created_by: user.userID,
      };
      createTruckingRecordThunk(recordWithUser);
    } else if (modalMode === 'edit' && selectedRecord) {
      const { id } = selectedRecord;
      const updatedRecord = {
        ...data,
        updated_by: user.userID,
      };
      updateTruckingRecordThunk(id, updatedRecord);
    }

    this.closeModal();
  };

  render() {
    return (
      <div className="flex flex-col h-full">
        {/* Taskbar */}
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
              onClick={this.openAddModal}
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
            onEditRecord={this.openEditModal}
          />

          <RecordModal
            isOpen={this.state.isModalOpen}
            mode={this.state.modalMode}
            initialData={this.state.selectedRecord || undefined}
            onClose={this.closeModal}
            onSubmit={this.handleModalSubmit}
          />
        </div>
      </div>
    );
  }
}

// --- Redux mapping ---
const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  createTruckingRecordThunk,
  updateTruckingRecordThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTab);
