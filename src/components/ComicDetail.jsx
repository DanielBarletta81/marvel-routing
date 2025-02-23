import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const ComicDetail = ({ comicId }) => {
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComicDetail = async () => {
      const timestamp = new Date().getTime();
      const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const publicKey = process.env.REACT_APP_MARVEL_API_KEY;
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${comicId}`, {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash
          }
        });
        setComic(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching comic:', error);
        setLoading(false);
      }
    };

    fetchComicDetail();
  }, [comicId]);

  if (loading) return <div>Loading...</div>;
  if (!comic) return <div>Comic not found</div>;

  return (
    <div className="comic-detail">
      <img 
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
        alt={comic.title} 
      />
      <h2>{comic.title}</h2>
      <p>{comic.description}</p>
      <div className="comic-info">
        <p>Page Count: {comic.pageCount}</p>
        <p>Price: ${comic.prices[0].price}</p>
      </div>
    </div>
  );
};

export default ComicDetail;
