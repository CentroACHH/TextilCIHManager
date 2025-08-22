import mongoose from "mongoose";

const reporteSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["entrada", "salida"],
    required: true
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  observaciones: {
    type: String,
    default: ""
  }
});

const Reporte = mongoose.model("Reporte", reporteSchema);
export default Reporte;
