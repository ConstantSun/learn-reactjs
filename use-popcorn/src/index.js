import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StarRating';
// import TextExpander from './TextExpander';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating /> */}
    
    {/* <TextExpander percentShowedWords={10}>
      Loved by over 4 million developers and more than 90,000 organizations
      worldwide, Sentry provides code-level observability to many of the world’s
      best-known companies like Disney, Peloton, Cloudflare, Eventbrite, Slack,
      Supercell, and Rockstar Games. Each month we process billions of
      exceptions from the most popular products on the internet.
    </TextExpander> */}
  </React.StrictMode>
);


