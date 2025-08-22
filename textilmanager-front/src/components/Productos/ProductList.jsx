import React, { useEffect, useState } from "react";
import API from "../../api";
import EditProduct from "./EditProduct";
import "./Products.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás segura de que deseas eliminar este producto?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts(); // Actualiza lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>

      {/* Scroll para la tabla */}
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>${product.price}</td>
                  <td>{product.cantidad}</td>
                  <td>
                    <button className="btn-edit" onClick={() => setProductToEdit(product)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(product._id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay productos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productToEdit && (
        <EditProduct
          productToEdit={productToEdit}
          onCancelEdit={() => setProductToEdit(null)}
          onProductUpdated={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductList;
