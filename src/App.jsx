import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import './App.css';

const App = () => {
    // -- Task 4: Integrating Components and Updating the User Interface --

  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacterId(characterId);
  };

  return (
    <div className="app">
      <header>
        <h1>Marvel Characters Explorer</h1>
      </header>
      <main>
        {selectedCharacterId ? (
          <div className="detail-view">
            <button 
              className="back-button"
              onClick={() => setSelectedCharacterId(null)}
            >
              Back to Characters
            </button>
            <CharacterDetail characterId={selectedCharacterId} />
          </div>
        ) : (
          <CharacterList onCharacterSelect={handleCharacterSelect} />
        )}
      </main>
    </div>
  );
};

export default App;