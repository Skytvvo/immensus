import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0Provider
          domain="YOUR_AUTH0_DOMAIN"
          clientId="YOUR_AUTH0_CLIENT_ID"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
