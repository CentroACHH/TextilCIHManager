import React, { useEffect, useState } from "react";
import API from "../../api";

const TablaSalidas = ({ refreshTrigger }) => {
  const [salidas, setSalidas] = useState([]);

  const fetchSalidas = async () => {
    try {
      const response = await API.get("/salidas");
      setSalidas(response.data);
    } catch (error) {
      console.error("Error al obtener salidas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta salida?")) return;
    try {
      await API.delete(`/salidas/${id}`);
      fetchSalidas();
    } catch (error) {
      console.error("Error al eliminar salida:", error);
    }
  };

  useEffect(() => { fetchSalidas(); }, [refreshTrigger]);

  return (
    <div className="product-list-container salidas-container">
      <h2>Salidas Registradas</h2>
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Costo Unitario</th>
              <th>Costo Producción</th>
              <th>Precio Venta</th>
              <th>Total Venta</th>
              <th>Ganancia</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {salidas.length > 0 ? (
              salidas.map(s => (
                <tr key={s._id}>
                  <td>{s.productId?.name || "No disponible"}</td>
                  <td>{s.cantidad}</td>
                  <td>${s.costoUnitario}</td>
                  <td>${s.costoProduccion}</td>
                  <td>${s.precioVenta}</td>
                  <td>${s.totalVenta}</td>
                  <td>${s.ganancia}</td>
                  <td>{new Date(s.date).toLocaleDateString("es-MX", {year:"numeric", month:"long", day:"numeric"})}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(s._id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No hay salidas registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaSalidas;
