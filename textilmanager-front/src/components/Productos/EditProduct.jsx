import React, { useState, useEffect } from "react";
import API from "../../api";
import "./Products.css";

const EditProduct = ({ productToEdit, onCancelEdit, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
    cantidad: 0,
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      
      [name]: name === "stock" || name === "price" || name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${formData._id}`, formData);
      onProductUpdated(); // recargar lista
      onCancelEdit();     // cerrar formulario
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
        />
        <div className="btn-group">
          <button type="submit" className="btn-guardar">Guardar cambios</button>
          <button type="button" className="btn-cancelar" onClick={onCancelEdit}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
