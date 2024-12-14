import './index.css';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4c1d95',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>,
);
