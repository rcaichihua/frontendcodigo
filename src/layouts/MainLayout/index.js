import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerButton = ({ text, icon, action }) => {
  const pathname = window.location.pathname.replace('/', '');
  const isSelected = pathname === text.toLowerCase();
  return (
    <ListItem
      selected={isSelected}
      key={text}
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton onClick={action}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const MainLayoutt = () => {
  const history = useNavigate();
  const { user, logout, isAuth } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => setOpen(!open);

  if (!isAuth()) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            sx={{
              width: '100%',
            }}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h6" noWrap component="div">
              {user.perfil}&nbsp;&nbsp;-&nbsp;&nbsp;
              {user.name}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h4" color="green">
            SGIApp
          </Typography>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Escanear QR */}
          <DrawerButton
            icon={<QrCode2Icon />}
            text="Scanear QR"
            action={() => history('/ScanQr')}
          />
          {/* Cobranzas Ejecutadas*/}
          <DrawerButton
            icon={<HomeWorkIcon />}
            text="Lista de Cobranzas"
            action={() =>
              history('/listpay', {
                state: { id: 1, name: '' },
              })
            }
          />

          {user.perfil === 'Admin' && (
            <DrawerButton
              icon={<ManageHistoryIcon />}
              text="Cobranzas Real Time"
              action={() => history('/listpayrealtime')}
            />
          )}
          {/* Gesti??n de usuarios */}
          {user.perfil === 'Admin' && (
            <DrawerButton
              icon={<GroupAddIcon />}
              text="Usuarios"
              action={() => history('/users')}
            />
          )}
          {/* Cerrar Sesi??n */}
          <DrawerButton
            icon={<LogoutIcon />}
            text="Cerrar Sesi??n"
            action={logout}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};
export default MainLayoutt;
