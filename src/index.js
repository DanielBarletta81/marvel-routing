import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import Comics from './components/Comics';
import ErrorPage from './components/ErrorPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="characters" element={<CharacterList />} />
          <Route path="characters/:id" element={<CharacterDetail />} />
          <Route path="comics" element={<Comics />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);