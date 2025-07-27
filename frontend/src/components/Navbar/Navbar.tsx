import React, { Component, createRef  } from 'react';
import { connect } from 'react-redux';
import { Settings, Bell, LogOut } from 'lucide-react';
import { logout } from '../../store/authSlice'; // adjust path as needed

type Notification = {
  id: string;
  message: string;
  timestamp?: string;
  read?: boolean;
};

interface NavbarState {
  navTitle: 'Title'
  showNotif: boolean;
  showSettings: boolean;
}
interface NavbarProps {
  navTitle: string
  user: any;
  notifications: Notification[];
}
class Navbar extends Component<NavbarProps, NavbarState> {
  notifRef = createRef<HTMLDivElement>();
  settingsRef = createRef<HTMLDivElement>();
  state: NavbarState = {
    navTitle: 'Title',
    showNotif: false,
    showSettings: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.notifRef.current &&
      !this.notifRef.current.contains(event.target as Node)
    ) {
      this.setState({ showNotif: false });
    }

    if (
      this.settingsRef.current &&
      !this.settingsRef.current.contains(event.target as Node)
    ) {
      this.setState({ showSettings: false });
    }
  };

  toggleNotif = () => {
    this.setState((prev) => ({ showNotif: !prev.showNotif }));
  };

  toggleSettings = () => {
    this.setState((prev) => ({ showSettings: !prev.showSettings }));
  };

  handleLogout = () => {
    this.props.logout(); // dispatch your Redux logout action
    localStorage.removeItem('token'); // or sessionStorage
    window.location.href = '/login'; // or window.location.reload();
  };

  render() {
    const { showNotif, showSettings } = this.state;
    const { user } = this.props;
    
    const notifications: Notification[] = [
      { id: '1', message: '📦 New booking received' },
      { id: '2', message: '⚠️ Maintenance at 9PM' },
      { id: '3', message: '👤 New user signed up' },
      { id: '4', message: '👤 New user signed up' },
    ];
    
    return (
      <header className="h-16 bg-white border-md px-6 flex items-center justify-between fixed left-64 right-0 top-0 z-10">
        <div className="text-lg font-bold text-[#0E75BC]">{ this.props.navTitle || 'Title' }</div>
        <div className="flex items-center gap-5">
          <span>{user?.username || 'User'}</span>
           {/* Notifications */}
          {/* <div className="relative" ref={this.notifRef}>
            <button onClick={this.toggleNotif}>
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-2 z-10">
                <p className="text-sm font-medium mb-2">Notifications</p>
                 <ul className="space-y-1 text-sm max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="p-2 text-gray-500">No new notifications</li>
                  ) : (
                    notifications.map((notif) => (
                      <li
                        key={notif.id}
                        className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      >
                        {notif.message}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div> */}

          {/* Settings */}
          <div className="relative" ref={this.settingsRef}>
            <button onClick={this.toggleSettings}>
              <Settings className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-10">
                <button
                  onClick={this.handleLogout}
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
            </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user, // adjust this path based on your store
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps,  mapDispatchToProps)(Navbar);
