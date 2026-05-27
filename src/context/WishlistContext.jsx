import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const userRaw = localStorage.getItem("yuhi_user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`yuhi_wishlist_${user.usuario}`);
      setWishlist(stored ? JSON.parse(stored) : []);
    } else {
      setWishlist([]);
    }
  }, [user?.usuario]);

  const toggleWishlist = (product) => {
    if (!user) return false; // Indica que se requiere login
    
    let next;
    const exists = wishlist.find(item => item.id === product.id && item.store === product.store);
    
    if (exists) {
      next = wishlist.filter(item => !(item.id === product.id && item.store === product.store));
    } else {
      next = [...wishlist, product];
    }
    
    setWishlist(next);
    localStorage.setItem(`yuhi_wishlist_${user.usuario}`, JSON.stringify(next));
    return true;
  };

  const isInWishlist = (id, store) => wishlist.some(item => item.id === id && item.store === store);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);