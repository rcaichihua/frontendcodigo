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
                {item.substring(0, 11)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DocumentoElectronico;
