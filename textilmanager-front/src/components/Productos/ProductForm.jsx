import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ productoEditando, onSuccess = () => {} }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
    cantidad: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (productoEditando) {
      setProduct(productoEditando);
    }
  }, [productoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      setError("El nombre y el precio son obligatorios.");
      return;
    }

    try {
      if (product._id) {
        // Editar producto
        await axios.put(`https://textilmanager-backend.onrender.com/api/products/${product._id}`, product);
      } else {
        // Crear nuevo producto
        await axios.post("https://textilmanager-backend.onrender.com/api/products", product);
      }

      onSuccess();

      // Reiniciar el formulario
      setProduct({
        name: "",
        description: "",
        category: "",
        stock: 0,
        price: 0,
        cantidad: 0,
      });

      setError("");
    } catch (error) {
      console.error("Error al guardar:", error);
      setError("Error al guardar el producto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product._id ? "Editar Producto" : ""}</h2>
      <h2>Agregar Producto</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-group">
        <label>Nombre *</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <input type="text" name="description" value={product.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Precio *</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Cantidad</label>
        <input type="number" name="cantidad" value={product.cantidad} onChange={handleChange} />
      </div>

      <button type="submit">{product._id ? "Actualizar Producto" : "Guardar Producto"}</button>
    </form>
  );
};

export default ProductForm;
