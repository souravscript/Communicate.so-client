import React from 'react';

const DataSourceShimmer = () => {
  // Create an array of 7 items to match the number of data sources
  const shimmerItems = Array(7).fill(null);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4 relative left-[10rem]">
      {shimmerItems.map((_, index) => (
        <div key={index} className="border rounded-lg overflow-hidden relative">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* Accordion Header */}
          <div className="px-4 py-4">
            <div className="flex items-center gap-4 w-full">
              {/* Icon placeholder */}
              <div className="w-6 h-6 bg-gray-200/70 rounded" />
              {/* Title placeholder */}
              <div className="flex-1">
                <div className="h-4 bg-gray-200/70 rounded w-24" />
              </div>
              {/* Status placeholder */}
              <div className="h-4 bg-gray-200/70 rounded w-16 mr-4" />
            </div>
          </div>

          {/* Accordion Content - show for first item to demonstrate loading state */}
          {index === 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Switch and label placeholder */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-4 bg-gray-200/70 rounded" />
                <div className="h-4 bg-gray-200/70 rounded w-48" />
              </div>
              {/* Description placeholder */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200/70 rounded w-3/4" />
                <div className="h-3 bg-gray-200/70 rounded w-1/2" />
                {/* Button placeholder */}
                <div className="h-9 bg-gray-200/70 rounded w-full mt-4" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DataSourceShimmer;