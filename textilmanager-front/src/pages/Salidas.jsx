import React, { useState } from "react";
import ExitForm from "../components/Entradas/ExitForm";
import TablaSalidas from "../components/Entradas/tablasald";

const Salidas = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  const handleExitAdded = () => {
    setRefreshTrigger(Date.now()); 
  };

  return (
    <div className="salidas-page">
      <ExitForm onExitAdded={handleExitAdded} />
      <TablaSalidas refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default Salidas;
