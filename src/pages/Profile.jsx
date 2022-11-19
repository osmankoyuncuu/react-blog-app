import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import NotUser from "../assets/user.svg";

const Profile = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
        padding: "1rem",
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
          padding: ".5rem",
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundImage: `url(${currentUser.photoURL || NotUser})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Box>

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
          <Typography>{currentUser?.displayName}</Typography>
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
          <Typography>{currentUser?.email}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
