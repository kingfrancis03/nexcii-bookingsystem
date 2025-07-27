// FooterPagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FooterPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const FooterPagination: React.FC<FooterPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
      <div className="flex justify-end pr-4">
      <div className="inline-flex items-center gap-4 rounded-lg bg-white px-4 py-2 shadow text-sm text-gray-700">
        <button
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="text-gray-800 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div> 
  );
};

export default FooterPagination;
