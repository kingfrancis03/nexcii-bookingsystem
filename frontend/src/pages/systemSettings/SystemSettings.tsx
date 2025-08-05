import React, { Component } from 'react';

interface Props {
  layout: 'horizontal' | 'vertical';
}

interface State {
  activeTab: string;
}

class SystemSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const defaultTab = props.layout === 'vertical' ? 'Trucking Company' : 'User Management';

    this.state = {
      activeTab: defaultTab,
    };
  }

  handleTabClick = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  renderTabButton = (tab: string) => {
    const isActive = this.state.activeTab === tab;

    const baseClasses = 'cursor-pointer transition-all';
    const verticalClasses = isActive
      ? 'font-bold text-blue-600 underline'
      : 'text-gray-600 hover:text-blue-600';
    const horizontalClasses = isActive
      ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
      : 'border-b-2 border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-600';

    const layoutClass =
      this.props.layout === 'vertical' ? verticalClasses : horizontalClasses;

    return (
      <button
        key={tab}
        onClick={() => this.handleTabClick(tab)}
        className={`${layoutClass} ${baseClasses} px-4 py-2 text-left`}
      >
        {tab}
      </button>
    );
  };

  render() {
    const { layout } = this.props;
    const { activeTab } = this.state;

    const allTabs = ['User Management', 'Trucking Company', 'Vessel', 'Fees Management'];
    const tabs = layout === 'vertical' ? allTabs.slice(1) : allTabs;

    return (
      <div
        className={`bg-white rounded-xl shadow-md p-6 ${
          layout === 'vertical' ? 'flex' : 'flex flex-col'
        }`}
      >
        {/* Tab buttons */}
        <div
          className={`${
            layout === 'vertical'
              ? 'flex flex-col space-y-2 w-1/4 border-r pr-4'
              : 'flex w-full border-b mb-4 space-x-4'
          }`}
        >
          {tabs.map(this.renderTabButton)}
        </div>

        {/* Content */}
        <div
          className={`${
            layout === 'vertical' ? 'pl-6 w-3/4' : 'mt-6 w-full'
          }`}
        >
          <h1 className="text-2xl font-semibold mb-2">{activeTab}</h1>
          <p className="text-gray-600">Placeholder for {activeTab} settings content.</p>
        </div>
      </div>
    );
  }
}

export default SystemSettings;
