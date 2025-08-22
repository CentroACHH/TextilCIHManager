import { useEffect, useState } from "react";
import axios from "axios";

const EntryForm = ({ onSuccess = () => {} }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:2000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !cantidad) return;

    try {
      await axios.post("http://localhost:2000/api/entries", {
        productId,
        cantidad: parseInt(cantidad),
      });
      setProductId("");
      setCantidad("");
      onSuccess(); // actualizar tabla
    } catch (error) {
      console.error("Error al registrar entrada", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Nueva Entrada</h3>
      <div>
        <label>Producto:</label>
        <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />
      </div>
      <button type="submit">Guardar Entrada</button>
    </form>
  );
};

export default EntryForm;
