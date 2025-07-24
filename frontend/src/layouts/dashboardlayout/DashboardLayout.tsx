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
      <div>
        <Sidebar />
        <Navbar navTitle={ this.props.navTitle }/>
        <main className="ml-64 mt-16 p-6 bg-[#DFE5EE] min-h-screen">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default DashboardLayout;
