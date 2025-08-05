import React from 'react';

function Sidebar() {
  const menuItems = [
    { label: 'Profile', icon: 'square-circle', active: false },
    { label: 'Apps', icon: 'overlapping-squares', active: false },
    { label: 'Dashboard', icon: 'four-squares', active: false },
    { label: 'Organizations', icon: 'building', active: false },
    { label: 'Keyword Discovery', icon: 'magnifying-glass', active: true },
    { label: 'Media', icon: 'image', active: false },
    { label: 'Analytics', icon: 'lightning', active: false },
    { label: 'History', icon: 'circular-arrow', active: false },
    { label: 'Settings', icon: 'gear', active: false },
    { label: 'Help', icon: 'question-mark', active: false },
    { label: 'Account', icon: 'person', active: false },
  ];

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'square-circle':
        return (
          <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
          </div>
        );
      case 'overlapping-squares':
        return (
          <div className="w-4 h-4 relative">
            <div className="w-2.5 h-2.5 border-2 border-current absolute top-0 left-0"></div>
            <div className="w-2.5 h-2.5 border-2 border-current absolute bottom-0 right-0"></div>
          </div>
        );
      case 'four-squares':
        return (
          <div className="w-4 h-4 border border-current p-0.5">
            <div className="grid grid-cols-2 gap-0.5 h-full">
              <div className="w-full h-full bg-current"></div>
              <div className="w-full h-full bg-current"></div>
              <div className="w-full h-full bg-current"></div>
              <div className="w-full h-full bg-current"></div>
            </div>
          </div>
        );
      case 'building':
        return (
          <div className="w-4 h-4 flex flex-col">
            <div className="w-3 h-1 bg-current rounded-t-sm mx-auto"></div>
            <div className="w-4 h-2 bg-current"></div>
            <div className="w-4 h-1 bg-current rounded-b-sm"></div>
          </div>
        );
      case 'magnifying-glass':
        return (
          <div className="w-4 h-4 relative">
            <div className="w-3 h-3 border-2 border-current rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1 border-r-2 border-b-2 border-current transform rotate-45 origin-bottom-right"></div>
          </div>
        );
      case 'image':
        return (
          <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
            <div className="w-2 h-1.5 bg-current rounded-sm"></div>
          </div>
        );
      case 'lightning':
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-2 h-3 bg-current transform rotate-12"></div>
          </div>
        );
      case 'circular-arrow':
        return (
          <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
            <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-45"></div>
          </div>
        );
      case 'gear':
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-current rounded-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-current"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-current"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0.5 bg-current"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0.5 bg-current"></div>
            </div>
          </div>
        );
      case 'question-mark':
        return (
          <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        );
      case 'person':
        return (
          <div className="w-4 h-4 flex flex-col items-center">
            <div className="w-2 h-2 bg-current rounded-full"></div>
            <div className="w-3 h-1.5 bg-current rounded-b-sm mt-0.5"></div>
          </div>
        );
      default:
        return (
          <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
        );
    }
  };

  return (
    <div className="w-16 bg-orange-primary flex flex-col items-center py-6 space-y-8">
      {/* Logo - White circle as shown in image */}
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-orange-primary rounded-full"></div>
      </div>

      {/* Menu Items with proper spacing */}
      <div className="flex flex-col items-center space-y-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              item.active 
                ? 'bg-white bg-opacity-20' 
                : 'hover:bg-white hover:bg-opacity-10'
            }`}
            title={item.label}
          >
            <div className={`${
              item.active ? 'text-white' : 'text-white opacity-80'
            }`}>
              {renderIcon(item.icon)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar; 