import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  const [selectedTab, setSelectedTab] = useState('competitor');
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCompetitorSelect = (competitor) => {
    if (selectedCompetitors.length < 6 && !selectedCompetitors.includes(competitor)) {
      setSelectedCompetitors([...selectedCompetitors, competitor]);
    }
  };

  const handleCompetitorRemove = (index) => {
    setSelectedCompetitors(selectedCompetitors.filter((_, i) => i !== index));
  };

  const handleClearAllCompetitors = () => {
    setSelectedCompetitors([]);
  };

  const handleGetKeywords = () => {
    if (selectedCompetitors.length > 0) {
      alert(`Analyzing keywords for: ${selectedCompetitors.join(', ')}`);
    } else {
      alert('Please select at least one competitor first!');
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent 
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          selectedCompetitors={selectedCompetitors}
          onCompetitorSelect={handleCompetitorSelect}
          onCompetitorRemove={handleCompetitorRemove}
          onClearAllCompetitors={handleClearAllCompetitors}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onGetKeywords={handleGetKeywords}
        />
      </div>
    </div>
  );
}

export default App; 