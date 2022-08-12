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

const Collect = () => {
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

  return (
    <div>
      <h1>Escanear Codigo QR</h1>
      <p>Documento electrónico</p>
      <div id="reader" width="600px"></div>
      <ol>
        {scannedCodes.map((scannedCode, index) => (
          <li key={index}>{scannedCode.decodedText}</li>
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

export default Collect;
