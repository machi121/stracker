import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
  console.log('Rendering AuthCallbackPage'); 
  const navigate = useNavigate();
  const [redirectToApp, setRedirectToApp] = useState(false);

  useEffect(() => {
    console.log('AuthCallbackPage useEffect triggered');
  
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idToken = urlParams.get('id_token');
    const accessToken = urlParams.get('access_token');
  
    Cookies.set('idToken', idToken);
    Cookies.set('accessToken', accessToken);
  
    console.log(Cookies.get('idToken'));
    console.log(Cookies.get('accessToken'));
  
    // No redirection code here
  }, []);

  return (
    <div>
      <p>You're successfully logged in.</p>
    </div>
  );
};

export default AuthCallbackPage;
