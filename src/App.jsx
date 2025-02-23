import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="main-header">
        <div className="logo">
          <NavLink to="/">
            <img src="/marvel-logo.jpg" alt="Marvel Logo" />
          </NavLink>
        </div>
        <nav>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            to="/characters"
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Browse Characters
          </NavLink>
          <NavLink 
            to="/comics"
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Comics
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default App;