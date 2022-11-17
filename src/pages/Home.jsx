import Box from "@mui/material/Box";
import BlogCard from "../component/BlogCard";

const Home = () => {
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
      <BlogCard />
    </Box>
  );
};

export default Home;
