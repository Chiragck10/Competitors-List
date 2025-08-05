import React, { useState } from 'react';

function Header() {
  const [pdfDropdownOpen, setPdfDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const pdfOptions = ['Report 1.pdf', 'Report 2.pdf', 'Analysis.pdf'];
  const countryOptions = [
    { name: 'United States', flag: '🇺🇸' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'France', flag: '🇫🇷' }
  ];

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 space-x-4">
      {/* PDF Dropdown */}
      <div className="relative">
        <button
          onClick={() => setPdfDropdownOpen(!pdfDropdownOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
          <span className="text-sm font-medium">Pdf Name</span>
          <div className="w-4 h-4 border-l-2 border-b-2 border-gray-500 transform rotate-45"></div>
        </button>
        
        {pdfDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {pdfOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                onClick={() => setPdfDropdownOpen(false)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Country Dropdown */}
      <div className="relative">
        <button
          onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg">🇮🇳</span>
          <span className="text-sm font-medium">Pdf Name</span>
          <div className="w-4 h-4 border-l-2 border-b-2 border-gray-500 transform rotate-45"></div>
        </button>
        
        {countryDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {countryOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center space-x-2"
                onClick={() => setCountryDropdownOpen(false)}
              >
                <span className="text-base">{option.flag}</span>
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header; 