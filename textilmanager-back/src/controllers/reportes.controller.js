import Reporte from "../models/Reporte.js";
import Product from "../models/Product.js";

// Crear un nuevo reporte
export const crearReporte = async (req, res) => {
  try {
    const { producto, cantidad, tipo, observaciones } = req.body;

    // Crear el nuevo reporte
    const nuevoReporte = new Reporte({ producto, cantidad, tipo, observaciones });
    await nuevoReporte.save();

    // Actualizar stock y cantidad del producto
    const product = await Product.findById(producto);
    if (product) {
      const cantidadNum = Number(cantidad); 
      const stockActual = Number(product.stock || 0);
      const cantidadActual = Number(product.cantidad || 0);

      if (tipo === "entrada") {
        product.stock = stockActual + cantidadNum;
        product.cantidad = cantidadActual + cantidadNum;
      } else if (tipo === "salida") {
        product.stock = stockActual - cantidadNum;
        product.cantidad = cantidadActual - cantidadNum;
        if (product.stock < 0) product.stock = 0;
        if (product.cantidad < 0) product.cantidad = 0;
      }

      await product.save();
    }

    res.status(201).json({
      message: "Reporte registrado correctamente",
      reporte: nuevoReporte,
    });
  } catch (error) {
    console.error("Error al registrar reporte:", error);
    res.status(500).json({
      message: "Error al registrar el reporte",
      error,
    });
  }
};

// Obtener todos los reportes
export const obtenerReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find().populate("producto");
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un reporte
export const eliminarReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Reporte.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ message: "Reporte no encontrado" });
    res.json({ message: "Reporte eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reporte", error });
  }
};
