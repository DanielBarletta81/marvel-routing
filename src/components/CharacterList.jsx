import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharacterList.css';

// -- Task 2: Fetch and Display Characters --

const CharacterList = ({ onCharacterSelect }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          'https://gateway.marvel.com/v1/public/characters',
          {
            params: {
              ts: '1',
              apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
              hash: process.env.REACT_APP_MARVEL_HASH,
              limit: 20
            }
          }
        );
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="character-grid">
      {characters.map(character => (
        <div 
          key={character.id} 
          className="character-card"
          onClick={() => onCharacterSelect(character.id)}
        >
          <img 
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};
export default CharacterList;