import * as React from "react";
import {
  Typography,
  Divider,
  Box,
  Button,
  Container,
  Menu,
  IconButton,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import HomeIcon from "@mui/icons-material/Home";
import { AccountCircle } from "@mui/icons-material";

export default function Header() {
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookies("currentUser");
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
          color: "white",
          borderBottom: "1px solid white",
          paddingBottom: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              fontWeight: "bold",
              textUnderlineOffset: "10px",
              color: location.pathname === "/" ? "#f5c518" : "inherit",
              textDecoration: location.pathname === "/" ? "underline" : "white",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon />
            Home
          </Button>
          {currentUser && currentUser.role && (
            <Button
              sx={{
                fontWeight: "bold",
                textUnderlineOffset: "10px",
                color:
                  location.pathname === "/watchlist" ? "#f5c518" : "inherit",
                textDecoration:
                  location.pathname === "/watchlist" ? "underline" : "white",
              }}
              onClick={() => {
                navigate("/watchlist");
              }}
            >
              Watchlist
            </Button>
          )}
          {role && role === "admin" ? (
            <Button
              sx={{
                fontWeight: "bold",
                textUnderlineOffset: "10px",
                color:
                  location.pathname === "/dashboard" ? "#f5c518" : "inherit",
                textDecoration:
                  location.pathname === "/dashboard" ? "underline" : "white",
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Button>
          ) : null}
        </Box>
        {currentUser && currentUser.role ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle sx={{ marginRight: "10px" }} />
              <Typography>{currentUser.name}</Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{}}
            >
              <MenuItem sx={{ p: 0 }}>
                <Button
                  sx={{
                    color: "black",
                    backgroundColor: "#f5c518",
                    fontWeight: "bold",
                  }}
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              sx={{
                fontWeight: "bold",
                color: "black",
                textUnderlineOffset: "10px",
                color: location.pathname === "/login" ? "#f5c518" : "inherit",
                textDecoration:
                  location.pathname === "/login" ? "underline" : "white",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              sx={{
                fontWeight: "bold",
                color: "black",
                textUnderlineOffset: "10px",
                color: location.pathname === "/signup" ? "#f5c518" : "inherit",
                textDecoration:
                  location.pathname === "/signup" ? "underline" : "white",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>

      <Divider sx={{ marginBottom: "20px" }} />
    </>
  );
}
