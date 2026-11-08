import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TopRatedPage from './pages/topRatedPage';
import PopularMoviesPage from './pages/popularPage';
import TrendingPage from './pages/trendingPage';
import PlaylistPage from './pages/playlistPage';
import {createTheme, ThemeProvider, CssBaseline} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e6900f", // Cinema red accent
    },
    secondary: {
      main: "#f5c518", // IMDb gold accent
    },
    background: {
      default: "#0a0d14", // Dark navy background
      paper: "#13181f",   // Slate surface color for cards/header
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 650,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners on all movie cards
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/movies/top-rated" element={<TopRatedPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingPage />} />
            <Route path="/movies/playlist" element={<PlaylistPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);