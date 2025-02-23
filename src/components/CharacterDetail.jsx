import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharacterDetail.css';

// -- Task 3: Fetch and Display Character Details --

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${characterId}`,
          {
            params: {
              ts: '1',
              apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
              hash: process.env.REACT_APP_MARVEL_HASH
            }
          }
        );
        setCharacter(response.data.data.results[0]);
        
        // Fetch associated comics
        const comicsResponse = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${characterId}/comics`,
          {
            params: {
              ts: '1',
              apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
              hash: process.env.REACT_APP_MARVEL_HASH,
              limit: 5
            }
          }
        );
        setComics(comicsResponse.data.data.results);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    if (characterId) {
      fetchCharacterDetails();
    }
  }, [characterId]);

  if (!character) {
    return <div className="loading">Loading character details...</div>;
  }

  return (
    <div className="character-detail">
      <div className="character-header">
        <img 
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <div className="character-info">
          <h2>{character.name}</h2>
          <p>{character.description || 'No description available.'}</p>
        </div>
      </div>
      
      <div className="comics-section">
        <h3>Featured Comics</h3>
        <div className="comics-grid">
          {comics.map(comic => (
            <div key={comic.id} className="comic-card">
              <img 
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <h4>{comic.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;