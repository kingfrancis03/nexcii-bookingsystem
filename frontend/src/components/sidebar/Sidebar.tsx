import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../LogoImage';
import { LayoutDashboard, Truck, Settings } from 'lucide-react';
import './sidebar.css'

class Sidebar extends Component {
  render() {
    return (
    <aside className="w-64 h-screen fixed top-0 left-0 z-10 bg-white flex">
        {/* Left vertical gradient border (50px) */}
        <div className="side-border pt-50 w-[50px] flex flex-col items-center py-6 space-y-6">
          {/* Icons (replace with real icons if needed) */}
          <span className="text-white text-xl">
            <LayoutDashboard className="w-6 h-6" />
          </span>
          <span className="text-white text-xl">
            <Truck className="w-6 h-6" />
          </span>
          <span className="text-white text-xl">
            <Settings className="w-6 h-6" />
          </span>
        </div>

        {/* Main sidebar content */}
        <div className="flex-1 p-4 border-r border-gray-300">
          <div className='w-full flex items-center justify-center'>
            <LogoImage width={100} />
          </div>
          <nav className="mt-10 pt-10">
            <ul className="side-item text-blue-950 font-bold space-y-2">
              <li className="hover:bg-gray-200 p-2 rounded flex items-center gap-2 cursor-pointer">
                <Link to="/dashboard" className="w-full h-full block">Dashboard</Link>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded flex items-center gap-2 cursor-pointer">
                <Link to="/trucking-records" className="w-full h-full block">Trucking Records</Link>
              </li>
              <li className="hover:bg-gray-200 p-2 rounded flex items-center gap-2 cursor-pointer">
                <Link to="/settings" className="w-full h-full block">System Settings</Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
