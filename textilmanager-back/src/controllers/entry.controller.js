
import Entry from '../models/Entry.js';
import Product from '../models/Product.js';

export const createEntry = async (req, res) => {
  try {
    const { productId, cantidad } = req.body;

    const newEntry = new Entry({ productId, cantidad });
    await newEntry.save();

    const product = await Product.findById(productId);
    if (product) {
      product.stock += cantidad;
      product.cantidad += cantidad; 
      await product.save();
    }

    res.status(201).json({
      message: "Entrada registrada correctamente",
      entrada: newEntry,
    });
  } catch (error) {
    console.error("Error al registrar entrada:", error);
    res.status(500).json({
      message: "Error al registrar la entrada",
      error,
    });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find().populate('productId');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las entradas", error });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const id = req.params.id.trim(); 
    const deletedEntry = await Entry.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entrada no encontrada' });
    }
    res.json({ message: 'Entrada eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la entrada', error });
  }
};

