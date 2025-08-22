import { useState } from "react";
import EntryForm from "../components/Entradas/EntryForm";
import EntryTable from "../components/Entradas/EntryTable";

const Entries = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h2>Gestión de Entradas</h2>
      <EntryForm onSuccess={handleRefresh} />
      <EntryTable refresh={refresh} />
    </div>
  );
};

export default Entries;
