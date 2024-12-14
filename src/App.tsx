import './App.scss';

import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from './constants/routes';

const MAPPED_ROUTES = ROUTES.map(r => {
  return {
    element: <Suspense fallback={<div>Loading...</div>}>{r.element}</Suspense>,
    path: r.path,
    index: r.index,
  };
});

const router = createBrowserRouter([
  {
    path: '/',
    children: MAPPED_ROUTES,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
