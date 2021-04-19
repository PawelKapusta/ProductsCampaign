import React from 'react';
import HomePage from './pages/HomePage';
import { ProductsProvider } from './context/ProductsContext';

const App = () => (
  <ProductsProvider>
    <HomePage />
  </ProductsProvider>
);

export default App;
