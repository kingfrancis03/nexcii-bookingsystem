import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import App from './App.js';
import './index.css';
import { decodeToken } from './utils/jwt';
import { logout } from './store/authSlice';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container!);

const validateTokenAndRender = async () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      const decoded: any = decodeToken(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token expired
        store.dispatch(logout());
        localStorage.removeItem('token');
        await persistor.purge(); // Ensure purge completes before redirect
        window.location.href = '/login';
        return; // stop rendering
      }
    } catch (err) {
      // Invalid token format
      store.dispatch(logout());
      localStorage.removeItem('token');
      await persistor.purge();
      window.location.href = '/login';
      return;
    }
  } else {
    await persistor.purge();
  }

  // Only render after validation
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

validateTokenAndRender();
