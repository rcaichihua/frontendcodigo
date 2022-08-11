import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const Collect = () => {
  const [collectText, setCollectText] = useState('');
  const history = useNavigate();

  function collectInput(event) {
    setCollectText(event.target.value);
  }

  function collectButton() {
    if (collectText === '') return;
    history(`/collect/${collectText}`);
  }

  return (
    <Box>
      <Container maxWidth="sm">
        <Grid container mt={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2">
                  Cobranza Inmobiliaria SBLM
                </Typography>
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
      </Container>
    </Box>
  );
};

export default Collect;
