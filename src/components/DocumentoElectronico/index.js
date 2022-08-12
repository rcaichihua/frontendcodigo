import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

const DocumentoElectronico = ({ item }) => {
  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            gap={3}
          >
            <Stack
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              <Typography variant="h6">
                {item.substring(13, 14) === '01'
                  ? 'Factura :'
                  : item.substring(13, 14) === '03'
                  ? 'Boleta :'
                  : item.substring(13, 14) === '08'
                  ? 'N. Debito :'
                  : item.substring(13, 14) === '07'
                  ? 'N. Credito :'
                  : 'N/A'}
                Serie:&nbsp;{item.substring(16, 19)}
                Número:&nbsp;{item.substring(21, 28)}
                Importe:&nbsp;{item.substring(21, 28)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DocumentoElectronico;
