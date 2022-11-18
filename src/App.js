import { createTheme, ThemeProvider } from "@mui/material";
import { cyan } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { BlogListProvider } from "./context/BlogListContext";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
      },
    },
  });
  return (
    <AuthContextProvider>
      <BlogListProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
          <ToastContainer />
        </ThemeProvider>
      </BlogListProvider>
    </AuthContextProvider>
  );
};

export default App;
