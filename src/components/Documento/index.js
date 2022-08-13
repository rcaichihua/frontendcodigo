import './index.css';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const Documento = ({
  id,
  tipo,
  serie,
  numero,
  fechacobro,
  importe,
  estado,
}) => {
  const handleDelete = async () => {
    const documentoDocRef = doc(db, 'documentos', id);
    try {
      console.log('Borrar :', documentoDocRef);
      await deleteDoc(documentoDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className={`documento ${true && 'comprobante--borderColor'}`}
    >
      <div className="comprobante__body">
        <p>{tipo}</p>
        <p>{serie}</p>
        <p>{numero}</p>
        <p>{importe}</p>
        <p>{estado}</p>
        <div className="documentos__buttons">
          <div className="documento__deleteNedit">
            <button
              className="documento__deleteButton"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documento;
