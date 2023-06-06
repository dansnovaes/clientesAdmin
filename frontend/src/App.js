import * as React from 'react';
import {BrowserRouter,Routes, Route, Link} from 'react-router-dom';
import './App.css';
import ListUser from './components/users/ListUser';
import CreateUser from './components/users/CreateUser';
import EditUser from './components/users/EditUser';
import ListClientes from './components/clientes/ListClientes';
import CreateClientes from './components/clientes/CreateClientes';
import EditClientes from './components/clientes/EditClientes';
import ListEnderecos from './components/enderecos/ListEnderecos';
import CreateEnderecos from './components/enderecos/CreateEnderecos';
import EditEnderecos from './components/enderecos/EditEnderecos';
import Login from './components/login/Login';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
const defaultTheme = createTheme();
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
export default function App() {


  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };



  return (
    
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Gestão de Clientes
              </Typography>
              
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}MenuIcon
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <Link to="user/list">Listar usuarios</Link>
              </ListItemButton>     
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <Link to="user/create">Criar usuarios</Link>
              </ListItemButton>     
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <Link to="clientes/list">Listar Clientes</Link>
              </ListItemButton>     
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <Link to="clientes/create">Criar Clientes</Link>  
              </ListItemButton>     
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
              <Routes>
                  <Route exact path="/" element={<Login/>} />
                </Routes>
                <Routes>
                  <Route path="clientes/list" element={<ListClientes />} />
                  <Route path="clientes/create" element ={<CreateClientes />} />
                  <Route path='clientes/:id/edit' element ={<EditClientes />} />
                </Routes>
                <Routes>
                  <Route path="user/list" element={<ListUser />} />
                  <Route path="user/create" element ={<CreateUser />} />
                  <Route path='user/:id/edit' element ={<EditUser />} />
                </Routes>
                <Routes>
                  <Route path="enderecos/:id_cliente/list" element={<ListEnderecos />} />
                  <Route path="enderecos/:id_cliente/create" element ={<CreateEnderecos />} />
                  <Route path='enderecos/:id/edit' element ={<EditEnderecos />} />
                </Routes>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}