import React from 'react';

function ActionButtons({ handleClearFilters, onSearch }) {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
      <button
        onClick={handleClearFilters}
        className="text-gray-600 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        Clear All
      </button>
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
    </div>
  );
}

export default ActionButtons;