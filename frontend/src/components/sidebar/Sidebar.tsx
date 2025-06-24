import React, { Component } from 'react';
import LogoImage from '../LogoImage';

class Sidebar extends Component {
  render() {
    return (
      <aside className="w-64 p-1 h-screen fixed top-0 left-0 z-10">
        <div className='w-full flex items-center justify-center'>
          <LogoImage width={70}/>
        </div>
        <nav className="mt-6">
          <ul className="text-blue-950 space-y-2 px-4">
            <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
            <li className="hover:bg-gray-700 p-2 rounded">Users</li>
            <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
