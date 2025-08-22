import React, { useState, useEffect } from "react";
import API from "../../api";

const ExitForm = ({ onExitAdded }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [costoUnitario, setCostoUnitario] = useState("");
  const [costoProduccion, setCostoProduccion] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/salidas", { productId, cantidad: Number(cantidad), costoUnitario: Number(costoUnitario), costoProduccion: Number(costoProduccion), precioVenta: Number(precioVenta) });
      alert("Salida registrada correctamente");
      setProductId(""); setCantidad(""); setCostoUnitario(""); setCostoProduccion(""); setPrecioVenta("");
      onExitAdded();
    } catch (error) {
      console.error("Error al registrar salida:", error);
      alert("Error al registrar salida");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Registrar Salida</h2>

      <div className="form-group">
        <label>Producto</label>
        <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
          <option value="">Selecciona un producto</option>
          {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Cantidad</label>
        <input type="number" value={cantidad} min={1} onChange={(e) => setCantidad(e.target.value)} required/>
      </div>

      <div className="form-group">
        <label>Costo Unitario</label>
        <input type="number" value={costoUnitario} min={0} onChange={(e) => setCostoUnitario(e.target.value)} required/>
      </div>

      <div className="form-group">
        <label>Costo de Producción</label>
        <input type="number" value={costoProduccion} min={0} onChange={(e) => setCostoProduccion(e.target.value)} required/>
      </div>

      <div className="form-group">
        <label>Precio de Venta</label>
        <input type="number" value={precioVenta} min={0} onChange={(e) => setPrecioVenta(e.target.value)} required/>
      </div>

      <button type="submit">Registrar Salida</button>
    </form>
  );
};

export default ExitForm;
