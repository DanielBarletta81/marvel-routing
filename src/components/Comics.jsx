import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import ComicDetail from './ComicDetail';
import './Comics.css';
const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComicId, setSelectedComicId] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      const timestamp = new Date().getTime();
      const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const publicKey = process.env.REACT_APP_MARVEL_API_KEY;
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash,
            limit: 20
          }
        });
        setComics(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching comics:', error);
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="comics-container">
      <h1>Marvel Comics</h1>
      {selectedComicId ? (
        <div>
          <button onClick={() => setSelectedComicId(null)}>Back to Comics</button>
          <ComicDetail comicId={selectedComicId} />
        </div>
      ) : (
        <div className="comics-grid">
          {comics.map(comic => (
            <div 
              key={comic.id} 
              className="comic-card"
              onClick={() => setSelectedComicId(comic.id)}
            >
              <img 
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                alt={comic.title} 
              />
              <h3>{comic.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comics;