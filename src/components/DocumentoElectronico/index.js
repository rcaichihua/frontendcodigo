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
                {item.substring(12, 14) === '01'
                  ? 'Factura :'
                  : item.substring(12, 14) === '03'
                  ? 'Boleta :'
                  : item.substring(12, 14) === '08'
                  ? 'N. Debito :'
                  : item.substring(12, 14) === '07'
                  ? 'N. Credito :'
                  : 'N/A'}
                Serie:&nbsp;{item.substring(15, 19)}
                Número:&nbsp;{item.substring(20, 28)}
                Importe:&nbsp;{item.split('|', 6)[6]}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DocumentoElectronico;
