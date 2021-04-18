import React, { useEffect, useState } from 'react';
import ProductsList from '../components/ProductsList/ProductsList';
import { getProducts } from '../api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return <ProductsList products={products} />;
};

export default HomePage;
