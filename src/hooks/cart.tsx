import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // const productsStorage = await AsyncStorage.getItem('@GoMarket:products');
      // if (productsStorage) {
      //   setProducts(productsStorage);
      // }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const updateProduct = products.find(p => p.id === product.id);
      if (updateProduct) {
        updateProduct.quantity += 1;
      } else {
        const productToAdd = product;
        productToAdd.quantity = 1;
        setProducts([...products, productToAdd]);
      }
      await AsyncStorage.setItem(
        '@GoMarket:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const newProducts = products.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
          };

          return updatedItem;
        }

        return item;
      });

      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@GoMarket:products',
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newProducts = products.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
          };

          return updatedItem;
        }

        return item;
      });

      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@GoMarket:products',
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
