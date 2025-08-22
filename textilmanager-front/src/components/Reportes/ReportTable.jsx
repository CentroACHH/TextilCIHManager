// ReportTable.jsx
import React from "react";
import "./Reportes.css";
import axios from "axios";

const ReportTable = ({ data, onDelete }) => {
  if (!data.length) return <p>No hay reportes disponibles</p>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://textilmanager-backend.onrender.com/api/reports/${id}`);
      onDelete();
    } catch (error) {
      console.error("Error al eliminar reporte:", error);
    }
  };

  return (
    <div className="report-table">
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((report) => (
            <tr key={report._id}>
              <td>{report.tipo}</td>
              <td>{new Date(report.fecha).toLocaleDateString()}</td>
              <td>{report.producto?.name || "Sin nombre"}</td>
              <td>{report.cantidad}</td>
              <td>{report.observaciones}</td>
              <td>
                <button onClick={() => handleDelete(report._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
