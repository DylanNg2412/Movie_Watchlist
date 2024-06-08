import * as React from "react";
import { Typography, Divider, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import HomeIcon from "@mui/icons-material/Home";

export default function Header() {
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;
  const navigate = useNavigate();
  const location = useLocation();

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
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              textUnderlineOffset: "10px",
              color: location.pathname === "/" ? "none" : "inherit",
              textDecoration: location.pathname === "/" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon />
            Home
          </Button>
          <Button
            sx={{
              textUnderlineOffset: "10px",
              color: location.pathname === "/watchlist" ? "none" : "inherit",
              textDecoration:
                location.pathname === "/watchlist" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/watchlist");
            }}
          >
            Watchlist
          </Button>
          {role && role === "admin" ? (
            <>
              <Button
                sx={{
                  textUnderlineOffset: "10px",
                  color:
                    location.pathname === "/dashboard" ? "none" : "inherit",
                  textDecoration:
                    location.pathname === "/dashboard" ? "underline" : "none",
                }}
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Button>
            </>
          ) : null}
        </Box>
        {currentUser && currentUser.role ? (
          <Box sx={{ display: " flex", alignItems: "center", gap: "10px" }}>
            <span>Current User: {currentUser.name}</span>
            <Button
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#238be6",
                color: "white",
              }}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                textUnderlineOffset: "10px",
                color: location.pathname === "/login" ? "none" : "inherit",
                textDecoration:
                  location.pathname === "/login" ? "underline" : "none",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              sx={{
                textUnderlineOffset: "10px",
                color: location.pathname === "/signup" ? "none" : "inherit",
                textDecoration:
                  location.pathname === "/signup" ? "underline" : "none",
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
