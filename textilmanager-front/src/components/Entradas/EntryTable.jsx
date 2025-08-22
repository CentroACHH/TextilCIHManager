import { useEffect, useState } from "react";
import axios from "axios";

const EntryTable = ({ refresh }) => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
const res = await axios.get("https://textilmanager-backend.onrender.com/api/entries");
      setEntries(res.data);
    } catch (error) {
      console.error("Error al obtener entradas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta entrada?")) return;
    try {
await axios.delete(`https://textilmanager-backend.onrender.com/api/entries/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Error al eliminar entrada:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [refresh]);

  return (
    <div>
      <h3>Entradas Registradas</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.productId?.name || "No disponible"}</td>
              <td>{entry.cantidad}</td>
              <td>{new Date(entry.fecha).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(entry._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntryTable;
