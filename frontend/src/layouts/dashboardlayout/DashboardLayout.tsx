import React, { Component, ReactNode } from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/Navbar';

interface Props {
  children: ReactNode;
  navTitle: string
}

class DashboardLayout extends Component<Props> {
  render() {
    return (
      <div className='h-full'>
        <Sidebar />
        <Navbar navTitle={ this.props.navTitle }/>
        <main className="ml-64 mt-16 p-4 bg-[#DFE5EE] h-full pb-20">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default DashboardLayout;
