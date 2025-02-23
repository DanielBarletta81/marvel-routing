import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './CharacterDetail.css';

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      if (!characterId) return;
      
      const timestamp = new Date().getTime();
      const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const publicKey = process.env.REACT_APP_MARVEL_API_KEY;
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}`, {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash
          }
        });
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.log('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [characterId]);

  if (loading) return <div>Loading...</div>;
  if (!character) return <div>Character not found</div>;

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <img 
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
        alt={character.name} 
      />
      <p>{character.description || 'No description available.'}</p>
    </div>
  );
};

export default CharacterDetail;