import express from 'express';
import cors from 'cors';
import path from 'path';
import productRoutes from './routes/product.routes.js';
import entryRoutes from './routes/entry.routes.js';
import salidaRoutes from './routes/salida.routes.js'; 
import reportesRoutes from "./routes/reportes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/salidas', salidaRoutes); 
app.use("/api/reports", reportesRoutes); 

export default app;
