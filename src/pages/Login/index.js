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
import Container from '@mui/material/Container';
import logo from './logo.png';

const Login = () => {
  const { login, isAuth } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('user'), data.get('pass'));
    console.log(data);
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
        <img src={logo} className="App-logo" alt="logo" />
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
