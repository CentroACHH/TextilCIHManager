import { useEffect, useState } from "react";
import axios from "axios";

const ReportForm = ({ onSave }) => {
  const [tipo, setTipo] = useState("entrada");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://textilmanager-backend.onrender.com/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReport = { tipo, producto, cantidad, observaciones };
    await axios.post("https://textilmanager-backend.onrender.com/api/reports", newReport);
    onSave(); // refrescar la tabla
    setTipo("entrada");
    setProducto("");
    setCantidad(0);
    setObservaciones("");
  };

  return (
    <form onSubmit={handleSubmit} className="reporte-section">
      <h2>Crear Reporte</h2>

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </select>

      <select
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        required
      >
        <option value="">Selecciona un producto</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        required
      />

      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ReportForm;
