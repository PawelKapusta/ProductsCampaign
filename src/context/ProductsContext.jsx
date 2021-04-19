import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getProducts } from '../api';

const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
  refetchData: () => {},
});

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const refetchData = useCallback(() => {
    setRefetch(!refetch);
  }, [refetch]);

  useEffect(() => {
    const get = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    get();
  }, [refetch]);

  return (
    <ProductsContext.Provider value={{ products, setProducts, refetchData }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
