import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './CharacterList.css';

const CharacterList = ({ onCharacterSelect }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const timestamp = new Date().getTime();
      const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const publicKey = process.env.REACT_APP_MARVEL_API_KEY;
      // Hash must be: timestamp + private + public
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);
      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash,
            limit: 20
          }
        });
        console.log('API Response:', response.data);
        setCharacters(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.log('Error details:', error.response);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <div>Loading...</div>;

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
