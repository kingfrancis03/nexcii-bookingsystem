import React, { Component, ReactNode } from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/Navbar';

interface Props {
  children: ReactNode;
}

class DashboardLayout extends Component<Props> {
  render() {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default DashboardLayout;
