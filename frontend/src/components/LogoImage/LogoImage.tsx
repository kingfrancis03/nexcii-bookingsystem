import React, { Component, CSSProperties } from 'react';
import logo from '../../assets/images/nexciilogo.png'; // ✅ This works with Vite

interface LogoImageProps {
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
}

class LogoImage extends Component<LogoImageProps> {
  // Internal logo path
  private logoSrc = logo; // Replace with your actual logo path

  render() {
    const {
      alt = 'Logo',
      width = '120px',
      height = 'auto',
      className = '',
      style = {},
      isLoading = false,
      maxWidth = '1200px',
      maxHeight = '1200px',
      minWidth = '60px',
      minHeight = '30px',
    } = this.props;

    const constrainedStyle: CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      ...style,
    };

    if (isLoading) {
      return (
        <div
          className={`animate-pulse bg-gray-200 rounded ${className}`}
          style={constrainedStyle}
        />
      );
    }

    return (
      <img
        src={this.logoSrc}
        alt={alt}
        className={`object-contain ${className}`}
        style={constrainedStyle}
      />
    );
  }
}

export default LogoImage;
