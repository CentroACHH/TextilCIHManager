
import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
 productId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
  required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Entry = mongoose.model('Entry', entrySchema);
export default Entry;
