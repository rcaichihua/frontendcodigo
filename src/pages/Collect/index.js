import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import QrCode from 'qrcode';

const Collect = () => {
  const [collectText, setCollectText] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorTexto, setErrorTexto] = useState(false);
  const [leyenda, setLeyenda] = useState('');
  const history = useNavigate();

  function collectInput(event) {
    setCollectText(event.target.value);
  }

  function collectButton() {
    if (collectText === '') return;
    history(`/collect/${collectText}`);
  }

  const generateQrCode = async () => {
    try {
      const response = await QrCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Container>
        <Card>
          <HeaderQr>Escanear codigo QR - SBL</HeaderQr>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Stack
                  mt={2}
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <TextField
                    label="Ingrese una Observación"
                    variant="outlined"
                    defaultValue=""
                    onChange={(e) => {
                      setText(e.target.value);
                      if (text.length >= 5) {
                        setErrorTexto(true);
                        setLeyenda(
                          'La texto tiene mas de 5 caracteres'
                        );
                      } else {
                        setErrorTexto(false);
                        setLeyenda('');
                      }
                    }}
                    error={errorTexto}
                    helperText={leyenda}
                  />
                  <Button
                    className="btn"
                    variant="contained"
                    color="primary"
                    onClick={() => generateQrCode()}
                  >
                    Generar
                  </Button>
                </Stack>
                <br />
                {imageUrl ? <img src={imageUrl} alt="qr" /> : null}
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                ></Grid>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                ></Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {/* <Container maxWidth="sm">
        <Grid container mt={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2">Cobranza SBLM</Typography>
                <Stack
                  mt={2}
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <TextField
                    label="Movie or tv show..."
                    fullWidth
                    onChange={collectInput}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={collectButton}
                  >
                    Collect
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container> */}
    </Box>
  );
};

const HeaderQr = styled('h2')((theme) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#6344dc',
  color: '#fff',
  padding: '10px',
}));

export default Collect;
