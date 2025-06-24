import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <header className="h-16 bg-white border-md px-6 flex items-center justify-between fixed left-64 right-0 top-0 z-10">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="flex items-center gap-4">
          <span>Welcome, User</span>
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>
    );
  }
}

export default Navbar;
