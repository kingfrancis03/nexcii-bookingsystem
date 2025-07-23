import React, { Component, ReactNode } from 'react';
import { EyeOff, SlidersHorizontal, Rows3, Filter, Download } from 'lucide-react'; 
import Dropdown from '../Dropdown';
interface TaskBarProps {
  testOnClick : (value: string) => void
}

const Divider = () => <div className="h-5 w-px bg-white opacity-50" />;

class TaskBar extends Component<TaskBar> {
  testClick = (label) => {
    this.props.testOnClick(label)
  }

  render() {
    return (
       <div className="bg-[#0E75BC] px-6 py-2 flex items-center gap-4 text-sm text-white shadow">
        {/* Overview */}
        {/* <button
          className="flex items-center gap-1 hover:underline"
          onClick={this.testClick}
        >
          <Rows3 className="w-4 h-4" />
          <span>Overview</span>
        </button> */}
        <Dropdown
          button={
            <button className="flex items-center gap-1 hover:underline text-white">
              <Rows3 className="w-4 h-4" />
              <span>Overview</span>
            </button>
          }
        >
          <ul className="py-2 w-32 text-sm">
            {['All', 'Today', 'This Month'].map((label) => (
              <li
                key={label}
                onClick={() => this.testClick(label)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {label}
              </li>
            ))}
          </ul>
        </Dropdown>
        <Divider />

        {/* Hide Columns */}
        <button className="flex items-center gap-1 hover:underline">
          <EyeOff className="w-4 h-4" />
          <span>Hide Columns</span>
        </button>

        <Divider />

        {/* Group */}
        <button className="flex items-center gap-1 hover:underline">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Group</span>
        </button>

        <Divider />

        {/* Filter */}
        <button className="flex items-center gap-1 hover:underline">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>

        <Divider />

        {/* Export */}
        <button className="flex items-center gap-1 hover:underline">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>
    );
  }
}

export default TaskBar;
