import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ResponsePay = () => {
  const history = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    //e.preventDefault();
    console.log(
      'location.state.tipoDocumento ',
      location.state.tipoDocumento
    );
    try {
      await addDoc(collection(db, 'documentos'), {
        tipo: location.state.tipoDocumento,
        serie: location.state.serie,
        numero: location.state.numero,
        importe: location.state.importe,
        fechacobro: Timestamp.now(),
        cobrador: location.state.cobrador,
      });
    } catch (err) {
      alert(err);
    }
  };

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
        {location.state.tipoDocumento !== 'N/A '
          ? () => handleSubmit()
          : null}
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
