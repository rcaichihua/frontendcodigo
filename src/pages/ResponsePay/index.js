import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CleaningServices } from '@mui/icons-material';

const ResponsePay = () => {
  const history = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h1>
        {String(location.state.tipoDocumento) !== 'N/A '
          ? 'Se registro correctamente!'
          : 'Ups! ocurrio un error!'}
      </h1>
      <p>
        {location.state.tipoDocumento !== 'N/A '
          ? location.state.tipoDocumento
          : ''}
      </p>
      <p>{location.state.serie}</p>
      <p>{location.state.numero}</p>
      <p>{location.state.importe}</p>
      <p>
        {location.state.tipoDocumento !== 'N/A '
          ? location.state.estado
          : ''}
      </p>
      <div id="reader" width="600px"></div>
      <Button
        onClick={() => history('/ScanQr')}
        className="btn"
        variant="contained"
        color="primary"
      >
        Volver
      </Button>
    </div>
  );
};

export default ResponsePay;
