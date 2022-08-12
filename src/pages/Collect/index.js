import { useState, useRef } from 'react';
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
import { QrReader } from 'react-qr-reader';

const Collect = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [errorTexto, setErrorTexto] = useState(false);
  const [leyenda, setLeyenda] = useState('');
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QrCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
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
                {imageUrl ? (
                  <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                  </a>
                ) : null}
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onScanFile}
                  >
                    Scan Qr Code
                  </Button>
                  <QrReader
                    ref={qrRef}
                    delay={300}
                    style={{ width: '100%' }}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
                  />
                  <h3>Scanned Code:{scanResultFile}</h3>
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <h3>Qr Code Scan by Web Cam</h3>
                  <QrReader
                    delay={300}
                    style={{ width: '100%' }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                  />
                  <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
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
