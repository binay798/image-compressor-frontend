import './App.css';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DropImage from './components/DropImage/DropImage';

const theme = createTheme({
  typography: {
    fontSize: '1.6rem',
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
            <h2 className='head__primary'>Free Image Converter</h2>
            <p className='head__para'>Convert your image files online & free</p>
            {/* DROP IMAGE */}
            <DropImage />
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default App;
