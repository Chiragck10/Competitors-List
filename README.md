# Keyword Discovery App

A React application for discovering new keywords based on your app, competitors, or existing keywords. Built with React, JavaScript, and Tailwind CSS.

## Features

- **Interactive Sidebar**: Navigation with various tools and sections
- **Competitor Analysis**: Select up to 6 competitors for keyword discovery
- **Multiple Discovery Methods**: 
  - By my app
  - By my competitor (currently active)
  - By Keywords
- **Competitor Categories**:
  - My List (create custom lists)
  - Top Paid competitors
  - Top Organic competitors
  - Similar competitors
- **Search Functionality**: Search for specific competitors
- **Responsive Design**: Modern UI with orange theme

## Functionalities

### Working Features:
1. **Tab Navigation**: Switch between different discovery methods
2. **Competitor Selection**: Click on competitors to add them (max 6)
3. **Competitor Removal**: Remove selected competitors with X button
4. **Search**: Filter competitors by typing in the search bar
5. **Create List**: Modal to create custom competitor lists
6. **Get Keywords**: Button that validates selection and shows analysis
7. **Dropdown Menus**: Header dropdowns for PDF and country selection
8. **Sidebar Navigation**: Interactive sidebar with hover effects

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Select Competitors**: 
   - Click on competitors from the different tabs (Top Paid, Top Organic, Similar)
   - Or create your own list using the "Create list" button

2. **Search**: Use the search bar to find specific competitors

3. **Remove Competitors**: Click the X button on selected competitors to remove them

4. **Get Keywords**: Click the "Get Keywords" button to analyze your selected competitors

## Technologies Used

- **React 18.2.0**: Frontend framework
- **JavaScript**: Programming language
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Hooks**: State management

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Left navigation sidebar
│   ├── Header.js           # Top header with dropdowns
│   └── MainContent.js      # Main content area
├── App.js                  # Main application component
├── index.js               # React entry point
└── index.css              # Global styles and Tailwind imports
```

## Customization

The app uses a custom orange color scheme defined in `tailwind.config.js`:
- `orange-primary`: #FF6B35
- `orange-light`: #FF8A65  
- `orange-dark`: #E55A2B

You can modify these colors or add new ones in the Tailwind configuration file. 