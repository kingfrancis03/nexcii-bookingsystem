import React, { Component } from 'react';

interface ErrorModalProps {
  error?: any;
}

class ErrorModal extends Component<ErrorModalProps, {}> {
  render() {
   const { error = 'Error Loading' } = this.props;

   return(
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Failed</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
    </div>
   )
  }
}

export default ErrorModal;