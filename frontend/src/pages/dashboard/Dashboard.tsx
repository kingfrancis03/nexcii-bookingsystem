import React, { Component } from 'react';
import DashboardLayout from '../../layouts/dashboardlayout'

class Dashboard extends Component {
  render() {
    return (
      <>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Card 1</div>
          <div className="bg-white p-4 rounded shadow">Card 2</div>
          <div className="bg-white p-4 rounded shadow">Card 3</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Card 1</div>
          <div className="bg-white p-4 rounded shadow">Card 2</div>
          <div className="bg-white p-4 rounded shadow">Card 3</div>
        </div>
      </>
    );
  }
}

export default Dashboard;
