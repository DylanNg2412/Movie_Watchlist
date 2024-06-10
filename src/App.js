import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";

import Movies from "./pages/Movies";
import Watchlist from "./pages/Watchlist";
import MoviesEdit from "./pages/MoviesEdit";
import MoviesAddNew from "./pages/MoviesAddNew";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import "./index.css";
import GenrePage from "./pages/GenrePage";
import MovieDetails from "./pages/MovieDetails";
import MovieEditList from "./pages/MoviesEditList";
import UserPage from "./pages/UserPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <SnackbarProvider
            maxSnack={10}
            autoHideDuration={1500}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/add" element={<MoviesAddNew />} />
                <Route path="/movies/:id" element={<MoviesEdit />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/genres" element={<GenrePage />} />
                <Route path="/movie-details/:id" element={<MovieDetails />} />
                <Route path="/manage-movies" element={<MovieEditList />} />
                <Route path="/manage-users" element={<UserPage />} />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
