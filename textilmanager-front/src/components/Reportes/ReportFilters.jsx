import React, { useState } from "react";

const ReportFilters = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tipo, setTipo] = useState("");

  const applyFilters = () => {
    onFilter({ startDate, endDate, tipo });
  };

  return (
    <div className="report-filters">
      <h3>Filtros</h3>
      <div className="filters-form">
        <div className="filter-group">
          <label>Fecha inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Fecha fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>

        <button className="btn-apply" onClick={applyFilters}>
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default ReportFilters;
