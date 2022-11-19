import { createContext, useContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [favorite, setFavorite] = useState(false);

  return (
    <FavoriteContext.Provider
      value={{ favoriteList, setFavoriteList, favorite, setFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
