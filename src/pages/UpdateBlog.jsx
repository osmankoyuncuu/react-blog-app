import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BlogBoard from "../assets/blog-board.jpg";
import Button from "@mui/material/Button";

const UpdateBlog = () => {
  return (
    <Box
      mt={2}
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Box
        sx={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem 2rem",
        }}
      >
        <img src={BlogBoard} alt="Blog-Board" width="100%" />
        <TextField
          required
          id="outlined-required"
          label="Title"
          variant="outlined"
          autoFocus
          sx={{ width: "100%" }}
        />
        <TextField
          required
          id="outlined-required"
          label="Image URL"
          variant="outlined"
          sx={{ width: "100%" }}
          size="300px"
        />
        <TextField
          required
          id="outlined-required"
          label="Image URL"
          variant="outlined"
          multiline
          rows={10}
          maxRows={20}
          sx={{ width: "100%" }}
        />
        <Button variant="contained" sx={{ width: "100%" }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateBlog;
