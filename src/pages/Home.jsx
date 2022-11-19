import Box from "@mui/material/Box";
import { useEffect } from "react";
import BlogCard from "../component/BlogCard";
import Loading from "../component/Loading";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { loading, setLoading } = useAuth();
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <Box
      m={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {loading ? <Loading /> : <BlogCard />}
    </Box>
  );
};

export default Home;
