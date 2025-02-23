import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404: Page Not Found</h1>
        <p>Looks like this page got snapped by Thanos!</p>
        <button onClick={() => navigate('/')}>
          Return to Safety
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
