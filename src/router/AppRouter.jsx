import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../component/Navbar";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import UpdateBlog from "../pages/UpdateBlog";
import NotFound from "../pages/NotFound";
import { useBlogList } from "../context/BlogListContext";
import { useBlogListener } from "../auth/firebase";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  const { setBlogList } = useBlogList();
  useBlogListener(setBlogList);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<PrivateRouter />}>
          <Route path="" element={<Detail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
