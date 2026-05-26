import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'yuhi_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading carrito:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error guardando carrito:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.store === product.store);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.store === product.store
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, store, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, store);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.store === store
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id, store) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.store === store)));
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getCartTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartCount, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
