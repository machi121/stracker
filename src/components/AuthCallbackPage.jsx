import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './AuthCallbackPage.css'; // Import your CSS file

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // console.log('AuthCallbackPage useEffect triggered');

    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idToken = urlParams.get('id_token');
    const accessToken = urlParams.get('access_token');
  
    Cookies.set('idToken', idToken);
    Cookies.set('accessToken', accessToken);
    
    console.log(Cookies.get('idToken'));
    console.log(Cookies.get('accessToken'));
  }, []);

  console.log('Rendering AuthCallbackPage');

  const handleGoToHomeClick = () => {
    navigate('/main');
  };

  return (
    <div className="auth-callback-container">
      <p className="success-message">You're successfully logged in.</p>
      {showButton && (
        <button className="go-to-home-button" onClick={handleGoToHomeClick}>
          Go to Home
        </button>
      )}
    </div>
  );
};

export default AuthCallbackPage;
