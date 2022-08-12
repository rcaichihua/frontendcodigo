import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {
  // Box,
  // Container,
  // Grid,
  // Card,
  // CardContent,
  // Stack,
  // TextField,
  Button,
} from '@mui/material';

const ScanQr = () => {
  const [scannedCodes, setScannedCodes] = useState([]);

  function activateLasers() {
    var decodedText = 'asdf';
    var decodedResult = 'asdfasdfasdf';
    console.log(scannedCodes);

    setScannedCodes(
      scannedCodes.concat([{ decodedText, decodedResult }])
    );
  }

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setScannedCodes(
        scannedCodes.concat([{ decodedText, decodedResult }])
      );
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
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
    if (documentoElectronico.length < 70) {
      return 'El documento electrónico no es válido';
    } else {
      return 'El documento electrónico es válido';
    }
  }

  return (
    <div>
      <h1>Escanear Codigo QR</h1>
      <p>Documento electrónico</p>
      <div id="reader" width="600px"></div>
      <ol>
        {scannedCodes.map((scannedCode, index) => (
          <div key={index}>
            {/* {String(scannedCode.decodedText).substring(0, 70)} */}
            {verificarDocumentoElectronico(scannedCode.decodedText)}
          </div>
        ))}
      </ol>
      <Button
        onClick={activateLasers}
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
