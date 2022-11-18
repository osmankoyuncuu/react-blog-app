import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logOut } from "../auth/firebase";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              LOGO
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography>{currentUser?.displayName}</Typography>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={currentUser?.photoURL}
                    alt={currentUser?.displayName}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {currentUser ? (
                  <div>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/profile");
                      }}
                    >
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/new-blog");
                      }}
                    >
                      <Typography textAlign="center">New Blog</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        logOut();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/login");
                      }}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/register");
                      }}
                    >
                      <Typography textAlign="center">Register</Typography>
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: "64px" }}></Box>
    </>
  );
};
export default Navbar;
