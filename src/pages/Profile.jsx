import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Profile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          flexDirection: "column",
          gap: "1rem",
          border: "2px solid gray",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img src="https://picsum.photos/200/200" alt="profile" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "80%",
            borderBottom: "2px solid gray",
            gap: ".3rem",
          }}
        >
          <Typography sx={{ color: "gray" }}>First Name</Typography>
          <Typography>Osman</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "80%",
            borderBottom: "2px solid gray",
            gap: ".3rem",
          }}
        >
          <Typography sx={{ color: "gray" }}>Last Name</Typography>
          <Typography>Koyuncu</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "80%",
            borderBottom: "2px solid gray",
            gap: ".3rem",
          }}
        >
          <Typography sx={{ color: "gray" }}>Username</Typography>
          <Typography>Lieutenant</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "80%",
            borderBottom: "2px solid gray",
            gap: ".3rem",
          }}
        >
          <Typography sx={{ color: "gray" }}>Email</Typography>
          <Typography>osmannnkoyuncuuu@gmail.com</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
