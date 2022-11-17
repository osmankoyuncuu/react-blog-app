import { createTheme, ThemeProvider } from "@mui/material";
import { cyan } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./router/AppRouter";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
