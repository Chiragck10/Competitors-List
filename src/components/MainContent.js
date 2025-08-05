import React, { useState } from 'react';

function MainContent({
  selectedTab,
  onTabChange,
  selectedCompetitors,
  onCompetitorSelect,
  onCompetitorRemove,
  onClearAllCompetitors,
  searchQuery,
  onSearchChange,
  onGetKeywords
}) {
  const [activeSubTab, setActiveSubTab] = useState('myList');
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newCompetitor, setNewCompetitor] = useState('');
  const [newListCompetitors, setNewListCompetitors] = useState([]);
  const [createListMode, setCreateListMode] = useState('new'); // 'new' or 'similar'
  const [selectedTemplateList, setSelectedTemplateList] = useState(null);
  const [customLists, setCustomLists] = useState([
    { id: 1, name: 'My Competitors', competitors: ['Netflix', 'Disney+'] },
    { id: 2, name: 'Streaming Apps', competitors: ['Hulu', 'Amazon Prime'] }
  ]);
  const [showKeywordsModal, setShowKeywordsModal] = useState(false);
  const [keywordsResults, setKeywordsResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'app', label: 'By my app' },
    { id: 'competitor', label: 'By my competitor' },
    { id: 'keywords', label: 'By Keywords' }
  ];

  const subTabs = [
    { id: 'myList', label: 'My List' },
    { id: 'topPaid', label: 'Top Paid' },
    { id: 'topOrganic', label: 'Top Organic' },
    { id: 'similar', label: 'Similar' }
  ];

  const mockCompetitors = [
    'Netflix', 'Disney+', 'Hulu', 'Amazon Prime', 'HBO Max', 'Apple TV+',
    'Peacock', 'Paramount+', 'Discovery+', 'Crunchyroll', 'Funimation',
    'YouTube TV', 'Sling TV', 'FuboTV', 'Philo', 'Vidgo'
  ];

  const filteredCompetitors = mockCompetitors.filter(competitor =>
    competitor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateList = () => {
    if (newListName.trim()) {
      let finalCompetitors = [];
      
      if (createListMode === 'similar' && selectedTemplateList) {
        // Copy competitors from selected template list
        finalCompetitors = [...selectedTemplateList.competitors];
      } else {
        // Use competitors added in the modal
        finalCompetitors = [...newListCompetitors];
      }
      
      const newList = {
        id: Date.now(),
        name: newListName,
        competitors: finalCompetitors
      };
      
      setCustomLists([...customLists, newList]);
      setNewListName('');
      setNewCompetitor('');
      setNewListCompetitors([]);
      setShowCreateListModal(false);
      setCreateListMode('new');
      setSelectedTemplateList(null);
      setActiveSubTab('myList');
      
      const message = createListMode === 'similar' 
        ? `List "${newListName}" created with ${finalCompetitors.length} competitors from "${selectedTemplateList.name}"!`
        : `List "${newListName}" created with ${finalCompetitors.length} competitors!`;
      alert(message);
    }
  };

  const handleAddCompetitorToNewList = () => {
    if (newCompetitor.trim() && !newListCompetitors.includes(newCompetitor.trim())) {
      setNewListCompetitors([...newListCompetitors, newCompetitor.trim()]);
      setNewCompetitor('');
    } else if (newListCompetitors.includes(newCompetitor.trim())) {
      alert('This competitor is already in the list!');
    }
  };

  const handleRemoveCompetitorFromNewList = (index) => {
    setNewListCompetitors(newListCompetitors.filter((_, i) => i !== index));
  };

  const handleAddToList = (listId, competitor) => {
    setCustomLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, competitors: [...list.competitors, competitor] }
        : list
    ));
  };

  const handleDeleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      setCustomLists(prev => prev.filter(list => list.id !== listId));
    }
  };

  const handleGetKeywords = async () => {
    if (selectedCompetitors.length === 0) {
      alert('Please select at least one competitor first!');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockKeywords = [
        { keyword: 'streaming service', volume: '1.2M', difficulty: 'High', cpc: '$2.50' },
        { keyword: 'watch movies online', volume: '890K', difficulty: 'Medium', cpc: '$1.80' },
        { keyword: 'tv shows streaming', volume: '650K', difficulty: 'Medium', cpc: '$1.95' },
        { keyword: 'best streaming platform', volume: '450K', difficulty: 'Low', cpc: '$3.20' },
        { keyword: 'streaming app download', volume: '320K', difficulty: 'High', cpc: '$2.10' },
        { keyword: 'online video streaming', volume: '280K', difficulty: 'Medium', cpc: '$1.65' },
        { keyword: 'streaming subscription', volume: '210K', difficulty: 'Low', cpc: '$2.80' },
        { keyword: 'watch series online', volume: '180K', difficulty: 'Medium', cpc: '$1.90' }
      ];
      
      setKeywordsResults(mockKeywords);
      setShowKeywordsModal(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    if (tabId === 'app') {
      alert('App-based keyword discovery coming soon!');
    } else if (tabId === 'keywords') {
      alert('Keyword-based discovery coming soon!');
    }
  };

  const handleCompetitorSelect = (competitor) => {
    if (selectedCompetitors.length >= 6) {
      alert('You can only select up to 6 competitors at a time.');
      return;
    }
    if (selectedCompetitors.includes(competitor)) {
      alert('This competitor is already selected.');
      return;
    }
    onCompetitorSelect(competitor);
  };

  const handleBulkAdd = (competitorsList) => {
    const availableSlots = 6 - selectedCompetitors.length;
    const toAdd = competitorsList.slice(0, availableSlots);
    toAdd.forEach(competitor => {
      if (!selectedCompetitors.includes(competitor)) {
        onCompetitorSelect(competitor);
      }
    });
    if (competitorsList.length > availableSlots) {
      alert(`Added ${toAdd.length} competitors. ${competitorsList.length - availableSlots} couldn't be added due to limit.`);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Title and Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keyword discovery</h1>
        <p className="text-gray-600 text-lg">
          Get suggestions of new keywords based on your app, competitors or keywords.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex space-x-8 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`pb-4 px-1 font-medium text-sm transition-colors ${
              selectedTab === tab.id
                ? 'text-orange-primary border-b-2 border-orange-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Competitor Selection Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Choose the competitors to discover new keywords opportunities
        </h2>
        
        {/* Selected Competitors */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected competitor ({selectedCompetitors.length}/6)
          </label>
          <div className="flex space-x-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center ${
                  selectedCompetitors[index]
                    ? 'border-orange-primary bg-orange-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {selectedCompetitors[index] ? (
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium text-orange-primary truncate max-w-12">
                      {selectedCompetitors[index]}
                    </span>
                    <button
                      onClick={() => onCompetitorRemove(index)}
                      className="mt-1 text-orange-primary hover:text-orange-dark"
                      title="Remove competitor"
                    >
                      <div className="w-3 h-3 border-2 border-current rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-current"></div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Clear All Button */}
          {selectedCompetitors.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Clear all selected competitors?')) {
                  onClearAllCompetitors();
                }
              }}
              className="mt-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Competitor List Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          {/* Sub Tabs */}
          <div className="flex space-x-6 mb-6 border-b border-gray-200">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`pb-3 px-1 font-medium text-sm transition-colors ${
                  activeSubTab === tab.id
                    ? 'text-orange-primary border-b-2 border-orange-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content based on active sub tab */}
          {activeSubTab === 'myList' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Create your own competitors list
              </h3>
              <p className="text-gray-600 mb-4">
                Your competitors will always be ready for analysis in Keyword discovery and Market intelligence tools
              </p>
              
              {/* Custom Lists */}
              {customLists.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Your Lists:</h4>
                  {customLists.map((list) => (
                    <div key={list.id} className="border border-gray-200 rounded-lg p-3 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{list.name}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleBulkAdd(list.competitors)}
                            className="text-xs bg-orange-primary text-white px-2 py-1 rounded hover:bg-orange-dark"
                          >
                            Add All
                          </button>
                          <button
                            onClick={() => handleDeleteList(list.id)}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {list.competitors.map((competitor, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {competitor}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => setShowCreateListModal(true)}
                className="bg-orange-primary text-white px-6 py-2 rounded-lg hover:bg-orange-dark transition-colors"
              >
                Create list
              </button>
            </div>
          )}

          {activeSubTab === 'topPaid' && (
            <div className="space-y-3">
              {filteredCompetitors.slice(0, 5).map((competitor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCompetitorSelect(competitor)}
                >
                  <span className="font-medium">{competitor}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Top Paid</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to selected competitors first
                        if (!selectedCompetitors.includes(competitor)) {
                          handleCompetitorSelect(competitor);
                        }
                        // Then add to custom list
                        const listToAddTo = customLists[0];
                        if (listToAddTo) {
                          handleAddToList(listToAddTo.id, competitor);
                          alert(`Added ${competitor} to selected competitors and ${listToAddTo.name}`);
                        } else {
                          alert('Please create a list first');
                        }
                      }}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Add to List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'topOrganic' && (
            <div className="space-y-3">
              {filteredCompetitors.slice(5, 10).map((competitor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCompetitorSelect(competitor)}
                >
                  <span className="font-medium">{competitor}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Top Organic</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to selected competitors first
                        if (!selectedCompetitors.includes(competitor)) {
                          handleCompetitorSelect(competitor);
                        }
                        // Then add to custom list
                        const listToAddTo = customLists[0];
                        if (listToAddTo) {
                          handleAddToList(listToAddTo.id, competitor);
                          alert(`Added ${competitor} to selected competitors and ${listToAddTo.name}`);
                        } else {
                          alert('Please create a list first');
                        }
                      }}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Add to List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'similar' && (
            <div className="space-y-3">
              {filteredCompetitors.slice(0, 3).map((competitor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCompetitorSelect(competitor)}
                >
                  <span className="font-medium">{competitor}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Similar</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to selected competitors first
                        if (!selectedCompetitors.includes(competitor)) {
                          handleCompetitorSelect(competitor);
                        }
                        // Then add to custom list
                        const listToAddTo = customLists[0];
                        if (listToAddTo) {
                          handleAddToList(listToAddTo.id, competitor);
                          alert(`Added ${competitor} to selected competitors and ${listToAddTo.name}`);
                        } else {
                          alert('Please create a list first');
                        }
                      }}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Add to List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
          </div>
          <input
            type="text"
            placeholder="Search for competitors"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Get Keywords Button */}
      <div className="flex justify-end">
        <button
          onClick={handleGetKeywords}
          disabled={isLoading || selectedCompetitors.length === 0}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            isLoading || selectedCompetitors.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-primary text-white hover:bg-orange-dark'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Get Keywords'}
        </button>
      </div>

      {/* Create List Modal */}
      {showCreateListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New List</h3>
            
            {/* List Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List Name (Headline)
              </label>
              <input
                type="text"
                placeholder="e.g., My Competitors"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
              />
            </div>

            {/* Create Mode Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Create List
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="createMode"
                    value="new"
                    checked={createListMode === 'new'}
                    onChange={(e) => {
                      setCreateListMode(e.target.value);
                      setSelectedTemplateList(null);
                      setNewListCompetitors([]);
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">Create new list with competitors</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="createMode"
                    value="similar"
                    checked={createListMode === 'similar'}
                    onChange={(e) => setCreateListMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Copy from existing list</span>
                </label>
              </div>
            </div>

            {/* Competitor Input (for new list mode) */}
            {createListMode === 'new' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Competitors
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g., Netflix"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCompetitorToNewList()}
                  />
                  <button
                    onClick={handleAddCompetitorToNewList}
                    disabled={!newCompetitor.trim()}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      newCompetitor.trim()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add
                  </button>
                </div>
                
                {/* Show added competitors */}
                {newListCompetitors.length > 0 && (
                  <div className="p-2 bg-gray-50 rounded border">
                    <p className="text-xs text-gray-600 mb-2">
                      Competitors in this list ({newListCompetitors.length}):
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {newListCompetitors.map((competitor, index) => (
                        <span key={index} className="text-xs bg-white px-2 py-1 rounded border flex items-center">
                          {competitor}
                          <button
                            onClick={() => handleRemoveCompetitorFromNewList(index)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Template List Selection */}
            {createListMode === 'similar' && customLists.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Template List
                </label>
                <select
                  value={selectedTemplateList?.id || ''}
                  onChange={(e) => {
                    const selected = customLists.find(list => list.id === parseInt(e.target.value));
                    setSelectedTemplateList(selected);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary"
                >
                  <option value="">Choose a list to copy from...</option>
                  {customLists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name} ({list.competitors.length} competitors)
                    </option>
                  ))}
                </select>
                
                {/* Show selected template competitors */}
                {selectedTemplateList && (
                  <div className="mt-2 p-2 bg-gray-50 rounded border">
                    <p className="text-xs text-gray-600 mb-1">
                      Competitors from "{selectedTemplateList.name}":
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTemplateList.competitors.map((competitor, index) => (
                        <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                          {competitor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleCreateList}
                disabled={!newListName.trim() || (createListMode === 'similar' && !selectedTemplateList)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  newListName.trim() && (createListMode === 'new' || selectedTemplateList)
                    ? 'bg-orange-primary text-white hover:bg-orange-dark'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateListModal(false);
                  setNewListName('');
                  setNewCompetitor('');
                  setNewListCompetitors([]);
                  setCreateListMode('new');
                  setSelectedTemplateList(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Results Modal */}
      {showKeywordsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-4/5 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Keyword Analysis Results</h3>
              <button
                onClick={() => setShowKeywordsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Analysis based on: {selectedCompetitors.join(', ')}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left">Keyword</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Search Volume</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Difficulty</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">CPC</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordsResults.map((keyword, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 font-medium">{keyword.keyword}</td>
                      <td className="border border-gray-200 px-4 py-2">{keyword.volume}</td>
                      <td className="border border-gray-200 px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          keyword.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                          keyword.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {keyword.difficulty}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">{keyword.cpc}</td>
                      <td className="border border-gray-200 px-4 py-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm mr-2">
                          Export
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  // Simulate export functionality
                  alert('Keywords exported to CSV!');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Export All
              </button>
              <button
                onClick={() => setShowKeywordsModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent; 