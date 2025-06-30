import React, { Component } from 'react';

interface LoadingModalProps {
  message?: string;
}

class LoadingModal extends Component<LoadingModalProps, {}> {
  render() {
   const { message = 'Loading...' } = this.props;

   return(
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="loader mb-4 animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        <p className="text-lg">{message}</p>
      </div>
    </div>
   )
  }
}

export default LoadingModal;