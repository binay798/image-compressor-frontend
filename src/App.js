import './App.css';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: '1rem',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Paper
          sx={{ padding: '3rem', maxWidth: '70rem', width: '100%' }}
          elevation={6}
        >
          <div className='head'>
            <h2 className='head__primary'>Image Converter</h2>
            <p className='head__para'>Convert your image files online & free</p>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default App;
