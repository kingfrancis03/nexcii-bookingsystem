import React, { Component, ReactNode, createRef } from 'react';

interface DropdownProps {
  button: ReactNode;
  children: (close: () => void) => ReactNode;
}

interface DropdownState {
  isOpen: boolean;
}

class Dropdown extends Component<DropdownProps, DropdownState> {
  dropdownRef = createRef<HTMLDivElement>();

  state: DropdownState = {
    isOpen: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  toggleDropdown = () => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  };

  closeDropdown = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const { button, children } = this.props;

    return (
      <div className="relative inline-block text-left" ref={this.dropdownRef}>
        <div onClick={this.toggleDropdown} className="cursor-pointer">
          {button}
        </div>
        {isOpen && (
          <div className="absolute mt-2 left-0 bg-white text-black shadow-md rounded-md z-20 min-w-[10rem] max-w-[90vw] overflow-hidden">
            {children(this.closeDropdown)}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
