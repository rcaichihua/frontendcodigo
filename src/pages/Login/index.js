import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from './logo.png';

const Login = () => {
  const { login, isAuth } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [isShown, setIsSHown] = useState(false);
  // const [errorTexto, setErrorTexto] = useState(false);
  // const [leyenda, setLeyenda] = useState('');
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get('user'));
    login(data.get('user'), data.get('pass'));
  };

  if (isAuth()) {
    return <Navigate to="/ScanQr" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
        <img src={logo} className="App-logo" alt="logo" />
        {/* <LockOutlinedIcon /> */}
        {/* </Avatar> */}
        {/* <Typography component="h1" variant="h5">
          Inicio de sesión
        </Typography> */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Nombre de usuario"
            name="user"
            autoFocus
            variant="outlined"
            defaultValue=""
            value={text}
            onChange={(event) => setText(event.target.value)}
            error={text === ''}
            helperText={
              text === ''
                ? 'Debe ingresar su nombre de usuario!'
                : ' '
            }
            // onChange={(e) => {
            //   setText(e.target.value);
            //   if (text.length === 0) {
            //     setErrorTexto(true);
            //     setLeyenda('Ingrese un usuario');
            //   } else {
            //     setErrorTexto(false);
            //     setLeyenda('');
            //   }
            // }}
            //error={errorTexto}
            //helperText={leyenda}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Contraseña"
            type={isShown ? 'text' : 'password'} //"password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={isShown}
                onChange={togglePassword}
              />
            }
            label="Ver contraseña"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Guardar inicio de sesión"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
