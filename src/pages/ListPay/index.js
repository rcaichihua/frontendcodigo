import './index.css';
import Documento from './../../components/Documento';
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../../services/firebase';

const ListPay = () => {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const DocumentoColRef = query(
      collection(db, 'documentos'),
      where('cobrador', 'in', ['FACTURA']),
      orderBy('fechacobro', 'desc')
    );
    onSnapshot(DocumentoColRef, (snapshot) => {
      setDocumentos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="documentoManager">
      <header>Lista de documentos</header>
      <div className="documentoManager__container">
        <div className="documentoManager__documentos">
          {documentos.map((documento) => (
            <Documento
              id={documento.id}
              key={documento.id}
              tipo={documento.data.tipo}
              serie={documento.data.serie}
              numero={documento.data.numero}
              fechacobro={documento.data.fechacobro}
              importe={documento.data.importe}
              estado={documento.data.estado}
              cobrador={documento.data.cobrador}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPay;
