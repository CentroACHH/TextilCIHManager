import Salida from '../models/Salida.js';
import Product from '../models/Product.js';

// Crear una nueva salida
export const registrarSalida = async (req, res) => {
  try {
    const { productId, cantidad, costoUnitario, costoProduccion, precioVenta } = req.body;

    const producto = await Product.findById(productId);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    if (producto.stock < cantidad) return res.status(400).json({ message: "Stock insuficiente" });

    // Restar cantidad en producto
    producto.stock -= cantidad;
    producto.cantidad -= cantidad;
    await producto.save();

    // Calcular total y ganancia
    const totalVenta = cantidad * precioVenta;
    const ganancia = totalVenta - cantidad * (costoUnitario + costoProduccion);

    const nuevaSalida = new Salida({
      productId,
      cantidad,
      costoUnitario,
      costoProduccion,
      precioVenta,
      totalVenta,
      ganancia
    });
    await nuevaSalida.save();

    res.status(201).json({
      message: "Salida registrada correctamente",
      salida: nuevaSalida,
      producto
    });

  } catch (error) {
    console.error("Error al registrar salida:", error);
    res.status(500).json({ message: "Error al registrar la salida", error });
  }
};

// Obtener todas las salidas
export const obtenerSalidas = async (req, res) => {
  try {
    const salidas = await Salida.find().populate('productId');
    res.json(salidas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las salidas", error });
  }
};

// Eliminar una salida
export const eliminarSalida = async (req, res) => {
  try {
    const { id } = req.params;
    const salidaEliminada = await Salida.findByIdAndDelete(id);
    if (!salidaEliminada) return res.status(404).json({ message: "Salida no encontrada" });
    res.status(200).json({ message: "Salida eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la salida", error });
  }
};
