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
            style={{
              color: location.pathname === "/watchlist" ? "white" : "inherit",
              textDecoration:
                location.pathname === "/watchlist" ? "#underline" : "none",
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
                  color:
                    location.pathname === "/dashboard" ? "white" : "inherit",
                  backgroundColor:
                    location.pathname === "/dashboard" ? "#238be6" : "inherit",
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
                color: location.pathname === "/login" ? "white" : "inherit",
                backgroundColor:
                  location.pathname === "/login" ? "#238be6" : "inherit",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              sx={{
                color: location.pathname === "/signup" ? "white" : "inherit",
                backgroundColor:
                  location.pathname === "/signup" ? "#238be6" : "inherit",
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
