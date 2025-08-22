import React, { useState, useEffect } from "react";
import ReportForm from "../components/Reportes/ReportForm";
import ReportFilters from "../components/Reportes/ReportFilters";
import ReportTable from "../components/Reportes/ReportTable";
import "../components/Reportes/Reportes.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchReports = async () => {
    try {
      const res = await fetch("https://textilmanager-backend.onrender.com/api/reports");
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error("Error al obtener reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // filtrar datos en base a filtros
  const filteredData = reports.filter((item) => {
    const itemDate = new Date(item.fecha);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;

    const matchDate =
      (!start || itemDate >= start) && (!end || itemDate <= end);

    const matchTipo = !filters.tipo || item.tipo === filters.tipo;

    return matchDate && matchTipo;
  });

  if (loading) return <p>Cargando reportes...</p>;

  return (
    <div className="reports-page">
      <h1>Reportes</h1>

      {/* Formulario para crear reportes */}
      <ReportForm onSave={fetchReports} />

      {/* Filtros */}
      <ReportFilters onFilter={setFilters} />

      {/* Tabla */}
      <ReportTable data={filteredData} onDelete={fetchReports} />
      
    </div>
  );
};

export default Reports;
