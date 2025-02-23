import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Comics from './components/Comics';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';

//Task 1: Install and Setup React Router
//Initialize a new React project or build off of the Marvel Comics API comic project.

// Task 3: Setting Up Routes
//In your application's main file, set up routes using BrowserRouter and Route from React Router.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/characters" element={<CharacterList />} />
    <Route path="/characters/:id" element={<CharacterDetail/>} />
    <Route path="/comics/:id" element={<Comics />} />
    </Routes>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
