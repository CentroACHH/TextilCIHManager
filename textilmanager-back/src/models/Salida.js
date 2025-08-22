import mongoose from 'mongoose';

const salidaSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  costoUnitario: {
    type: Number,
    required: true
  },
  costoProduccion: {
    type: Number,
    required: true
  },
  precioVenta: {
    type: Number,
    required: true
  },
  totalVenta: {
    type: Number
  },
  ganancia: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Salida = mongoose.model('Salida', salidaSchema);
export default Salida;
