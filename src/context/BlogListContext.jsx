import { createContext, useContext, useState } from "react";

export const BlogListContext = createContext();

export const BlogListProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);

  return (
    <BlogListContext.Provider value={{ blogList, setBlogList }}>
      {children}
    </BlogListContext.Provider>
  );
};

export const useBlogList = () => useContext(BlogListContext);
