import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './CharacterList.css';


const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
 

  useEffect(() => {
    const fetchCharacters = async () => {
      const timestamp = new Date().getTime();
      const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const publicKey = process.env.REACT_APP_MARVEL_API_KEY;
      const hash = md5(timestamp + privateKey + publicKey);

      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash,
            limit: 20
          }
        });
        setCharacters(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching characters:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  if (loading) return <div>Loading...</div>
  return (
    <div className="character-container">
      <div className="character-grid">
        {characters.map(character => (
          <div 
            key={character.id} 
            className="character-card"
            onClick={() => handleCharacterClick(character)}
          >
            <img 
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
              alt={character.name} 
            />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="character-detail-modal">
          <div className="modal-content">
            <button onClick={() => setSelectedCharacter(null)}>Close</button>
            <img 
              src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`} 
              alt={selectedCharacter.name} 
            />
            <h2>{selectedCharacter.name}</h2>
            <p>{selectedCharacter.description || "No description available"}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CharacterList;