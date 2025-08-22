import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// vistas

import ProductList from './components/Productos/ProductList.jsx';
import AddProduct from './components/Productos/AddProduct'; 
import Entries from "./pages/Entries";
import Exits from "./pages/Salidas";
import Reports from "./pages/Reports";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/agregar-producto" element={<AddProduct />} />
        <Route path="/entradas" element={<Entries />} />
        <Route path="/salidas" element={<Exits />} />
        <Route path="/reportes" element={<Reports />} />
      </Routes>
    </Layout>
  );
}

export default App;
