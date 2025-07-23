import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import TransactionsTab from '../../components/BookingSystem/Tabs/Transactions';
import LogoImage from '../../components/LogoImage';
import { Settings, List, EyeOff, SlidersHorizontal, Rows3, Filter, Download } from 'lucide-react'; 

interface BookingSystemState {
  activeTab: 'transactions' | 'settings';
}

class BookingSystem extends Component<{}, BookingSystemState> {
    state: BookingSystemState = {
    activeTab: 'transactions',
  };

  setTab = (tab: 'transactions' | 'settings') => {
    this.setState({ activeTab: tab });
  };
  render() {
    const { activeTab } = this.state;

    return (
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col bg-[#E6EFF5]">

  {/* Header */}
    <div className="bg-white z-50">
        <LogoImage width={'calc(var(--spacing) * 16)'} className='ml-10' />
        <Navbar navTitle="Booking System" />
        <div className="px-6 py-3 flex items-center gap-6 border-b border-gray-200">
        <button
            onClick={() => this.setTab('transactions')}
            className={`flex items-center gap-2 text-[#0E75BC] hover:text-blue-800 px-2 ${activeTab === 'transactions' ? 'font-bold' : 'font-medium'}`}
        >
            <List className="w-5 h-5" />
            <span>Transactions</span>
        </button>
        <button
            onClick={() => this.setTab('settings')}
            className={`flex items-center gap-2 text-[#0E75BC] hover:text-blue-800 px-2 ${activeTab === 'settings' ? 'font-bold' : 'font-medium'}`}
        >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
        </button>
        </div>
    </div>

    {/* Tab content */}
    <div className="flex-grow overflow-hidden">
        {activeTab === 'transactions' && <TransactionsTab />}
        {activeTab === 'settings' && <p>This is the Settings tab content.</p>}
    </div>
    </div>
    );
  }
}

export default BookingSystem;
