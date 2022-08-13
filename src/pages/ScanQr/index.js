import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@mui/material';
import { DocumentoElectronico } from './../../components';
import { useNavigate } from 'react-router-dom';

const ScanQr = () => {
  let documento = '';
  const history = useNavigate();
  const [scannedCodes, setScannedCodes] = useState([]);

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setScannedCodes(
        scannedCodes.concat([{ decodedText, decodedResult }])
      );
    }

    function onScanFailure(error) {
      console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  function verificarDocumentoElectronico(documentoElectronico) {
    if (documentoElectronico.length >= 400) {
      //RUC Beneficencia de Lima
      if (documentoElectronico.substring(0, 11) === '20135604551') {
        documento = documentoElectronico;
        return (
          <DocumentoElectronico key={1} item={documentoElectronico} />
        );
      } else {
        return <h2>RUC no válido</h2>;
      }
    } else {
      return <h2>Código Qr no válido</h2>;
    }
  }

  return (
    <div>
      <h1>Escanear Codigo QR</h1>
      <p>Documento electrónico</p>
      <div id="reader" width="600px"></div>
      {scannedCodes.map((scannedCode, index) => (
        <div key={index}>
          {verificarDocumentoElectronico(scannedCode.decodedText)}
        </div>
      ))}
      <Button
        // onClick={activateLasers}
        onClick={() =>
          history('/responsepay', {
            state: {
              id: 1,
              tipoDocumento:
                documento.substring(12, 14) === '01'
                  ? 'Factura '
                  : documento.substring(12, 14) === '03'
                  ? 'Boleta '
                  : documento.substring(12, 14) === '08'
                  ? 'N. Debito '
                  : documento.substring(12, 14) === '07'
                  ? 'N. Credito '
                  : 'N/A ',
              serie: documento.substring(15, 19),
              numero: documento.substring(20, 28),
              importe: documento.split('|', 6)[5],
              estado: 'Cancelado',
            },
          })
        }
        className="btn"
        variant="contained"
        color="primary"
      >
        Realizar pago
      </Button>
    </div>
  );
};

export default ScanQr;
