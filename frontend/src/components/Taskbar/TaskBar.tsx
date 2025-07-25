import React, { Component } from 'react';
import { EyeOff, SlidersHorizontal, Rows3, Filter, Download } from 'lucide-react'; 
import Dropdown from '../Dropdown';

interface Header {
  key: string;
  label: any;
}

interface TaskBarProps {
  changeOverview: (value: string) => void;
  theaders: Header[];
  onToggleColumn?: (visibleColumns: string[]) => void; // optional callback to parent
}

interface TaskBarState {
  visibleColumns: string[];
}

const Divider = () => <div className="h-5 w-px bg-white opacity-50" />;

class TaskBar extends Component<TaskBarProps, TaskBarState> {
  state: TaskBarState = {
    visibleColumns: this.props.theaders.map((col) => col.key), // all visible by default
  };

  componentDidUpdate(prevProps: TaskBarProps, prevState: TaskBarState): void {
    if (prevState.visibleColumns !== this.state.visibleColumns) {
      this.props.onToggleColumn?.(this.state.visibleColumns); // emit to parent if needed
    }

    const prevKeys = prevProps.theaders.map(c => c.key).join(',');
    const newKeys = this.props.theaders.map(c => c.key).join(',');

    if (prevKeys !== newKeys) {
      this.setState({
        visibleColumns: this.props.theaders.map((col) => col.key),
      });
    }
  }

  changeOverview = (index: number) => {
    this.props.changeOverview(index);
  };

  handleToggleColumn = (key: string) => {
    this.setState((prevState) => {
      const alreadyVisible = prevState.visibleColumns.includes(key);
      const newVisible = alreadyVisible
        ? prevState.visibleColumns.filter((k) => k !== key)
        : [...prevState.visibleColumns, key];
      this.props.onToggleColumn(newVisible)
      return { visibleColumns: newVisible };
    });
  };

  render() {
    const { visibleColumns } = this.state;

    return (
      <div className="bg-[#0E75BC] px-6 py-2 flex items-center gap-4 text-sm text-white shadow">
        {/* Overview */}
        <Dropdown
          button={
            <button className="flex items-center gap-1 hover:underline text-white">
              <Rows3 className="w-4 h-4" />
              <span>Overview</span>
            </button>
          }
        >
          {(close) => (
            <ul className="py-2 w-32 text-sm">
              {['All Transactions', 'Today', 'This Month'].map((label, index) => (
                <li
                  key={label}
                  onClick={() => {
                    this.changeOverview(index);
                    close();
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </Dropdown>

        <Divider />

        {/* Hide Columns */}
        <Dropdown
          button={
            <button className="flex items-center gap-1 hover:underline text-sm">
              <EyeOff className="w-4 h-4" />
              <span>Hide Columns</span>
            </button>
          }
        >
          {(close) => (
            <ul className="py-2 px-2 w-48 text-sm max-h-64 overflow-y-auto">
              {this.props.theaders.map((col) => (
                <li key={col.key} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => this.handleToggleColumn(col.key)}
                  />
                  <label>{col.label}</label>
                </li>
              ))}
            </ul>
          )}
        </Dropdown>

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
