import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToDo from './components/todo';

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Firestore Todo-App
            </Typography>
          </Toolbar>
        </AppBar>
        <ToDo />
          
      </Box>
    </>
  )
}
export default App;